import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MAX_FILE_BYTES, MIN_FILL_MS, validateFile, validateQuote } from "@/lib/quote";
import { POST } from "@/app/api/preventivo/route";

const NOW = 1_800_000_000_000;

function validForm(overrides: Record<string, string | File | null> = {}) {
  const fd = new FormData();
  const base: Record<string, string> = {
    azienda: "Fonderia Test S.r.l.",
    nome: "Mario Rossi",
    email: "mario.rossi@example.com",
    telefono: "+39 035 000000",
    materiale: "Alluminio pressofuso EN AC-46100",
    dimensioni: "300 x 200 x 50 mm",
    quantita: "5000",
    colore: "RAL 9005",
    specifiche: "Ambiente marino",
    privacy: "on",
    website: "",
    t: String(NOW - 60_000),
    attribution: JSON.stringify({ utm_source: "google", utm_campaign: "pressofuso", evil: "x" }),
  };
  for (const [k, v] of Object.entries(base)) fd.set(k, v);
  for (const [k, v] of Object.entries(overrides)) {
    if (v === null) fd.delete(k);
    else if (typeof v === "string") fd.set(k, v);
    else fd.set(k, v, v.name);
  }
  return fd;
}

const fileOf = (name: string, bytes: number, type: string) => new File([new Uint8Array(bytes)], name, { type });

describe("validateQuote", () => {
  it("accetta un modulo completo e filtra l'attribuzione", () => {
    const r = validateQuote(validForm(), NOW);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.fields.azienda).toBe("Fonderia Test S.r.l.");
      expect(r.data.attribution).toEqual({ utm_source: "google", utm_campaign: "pressofuso" });
    }
  });

  it("segnala i campi obbligatori mancanti", () => {
    const r = validateQuote(validForm({ azienda: "", nome: "", email: "", telefono: "", materiale: "", privacy: null }), NOW);
    expect(r.ok).toBe(false);
    if (!r.ok && !r.spam) {
      expect(Object.keys(r.errors).sort()).toEqual(["azienda", "email", "materiale", "nome", "privacy", "telefono"]);
    }
  });

  it("rifiuta email e telefono non validi", () => {
    const r = validateQuote(validForm({ email: "non-una-email", telefono: "abc" }), NOW);
    expect(!r.ok && !r.spam && r.errors.email && r.errors.telefono).toBeTruthy();
  });

  it("richiede il consenso privacy", () => {
    const r = validateQuote(validForm({ privacy: null }), NOW);
    expect(!r.ok && !r.spam && r.errors.privacy).toBeTruthy();
  });

  it("rifiuta testi troppo lunghi", () => {
    const r = validateQuote(validForm({ specifiche: "x".repeat(4001) }), NOW);
    expect(!r.ok && !r.spam && r.errors.specifiche).toBeTruthy();
  });

  it("marca come spam se l'honeypot è compilato", () => {
    expect(validateQuote(validForm({ website: "https://spam.example" }), NOW)).toEqual({ ok: false, spam: true });
  });

  it("marca come spam un invio troppo rapido", () => {
    const r = validateQuote(validForm({ t: String(NOW - (MIN_FILL_MS - 100)) }), NOW);
    expect(r).toEqual({ ok: false, spam: true });
  });
});

describe("allegato", () => {
  it("accetta PDF, DWG e JPG entro 10 MB", () => {
    expect(validateFile({ name: "disegno.pdf", size: 1000, type: "application/pdf" })).toBeNull();
    expect(validateFile({ name: "disegno.DWG", size: 1000, type: "" })).toBeNull();
    expect(validateFile({ name: "foto.jpg", size: MAX_FILE_BYTES, type: "image/jpeg" })).toBeNull();
  });

  it("rifiuta file oltre 10 MB", () => {
    expect(validateFile({ name: "disegno.pdf", size: MAX_FILE_BYTES + 1, type: "application/pdf" })).toMatch(/10 MB/);
    const r = validateQuote(validForm({ allegato: fileOf("grande.pdf", MAX_FILE_BYTES + 1, "application/pdf") }), NOW);
    expect(!r.ok && !r.spam && r.errors.allegato).toMatch(/10 MB/);
  });

  it("rifiuta formati non ammessi", () => {
    expect(validateFile({ name: "virus.exe", size: 10, type: "application/x-msdownload" })).toMatch(/Formato/);
    expect(validateFile({ name: "finto.pdf", size: 10, type: "text/html" })).toMatch(/Formato/);
  });

  it("accetta solo URL di Vercel Blob", () => {
    const ok = validateQuote(
      validForm({ allegato_url: "https://abc.public.blob.vercel-storage.com/preventivi/d.pdf", allegato_nome: "d.pdf", allegato_dimensione: "6000000" }),
      NOW,
    );
    expect(ok.ok).toBe(true);
    const bad = validateQuote(
      validForm({ allegato_url: "https://evil.example/d.pdf", allegato_nome: "d.pdf", allegato_dimensione: "6000000" }),
      NOW,
    );
    expect(!bad.ok && !bad.spam && bad.errors.allegato).toBeTruthy();
  });
});

describe("POST /api/preventivo", () => {
  const fetchMock = vi.fn();
  let ipCounter = 0;

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: "1" }), { status: 200 }));
    process.env.RESEND_API_KEY = "test-key";
    process.env.QUOTE_TO_EMAIL = "amministrazione@alsil.it";
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.RESEND_API_KEY;
  });

  const req = (fd: FormData, headers: Record<string, string> = {}) =>
    new Request("http://localhost/api/preventivo", {
      method: "POST",
      body: fd,
      headers: { "x-forwarded-for": `10.0.0.${++ipCounter}`, ...headers },
    });
  const form = (o: Record<string, string | File | null> = {}) => validForm({ t: String(Date.now() - 60_000), ...o });

  it("invia l'email a amministrazione@alsil.it con allegato e UTM", async () => {
    const res = await POST(req(form({ allegato: fileOf("disegno.pdf", 2048, "application/pdf") })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["amministrazione@alsil.it"]);
    expect(body.reply_to).toBe("mario.rossi@example.com");
    expect(body.attachments[0].filename).toBe("disegno.pdf");
    expect(body.text).toContain("utm_campaign: pressofuso");
    expect(init.headers.Authorization).toBe("Bearer test-key");
  });

  it("risponde 422 con gli errori di validazione", async () => {
    const res = await POST(req(form({ email: "x" })));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.errors.email).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("honeypot: risponde ok ma non invia nulla", async () => {
    const res = await POST(req(form({ website: "spam" })));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rifiuta un body oltre il limite con 413", async () => {
    const res = await POST(req(form(), { "content-length": String(MAX_FILE_BYTES + 1024 * 1024) }));
    expect(res.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rifiuta un allegato oltre 10 MB con 422", async () => {
    const res = await POST(req(form({ allegato: fileOf("grande.pdf", MAX_FILE_BYTES + 1, "application/pdf") })));
    expect(res.status).toBe(422);
    expect((await res.json()).errors.allegato).toMatch(/10 MB/);
  });

  it("risponde 502 se l'invio email fallisce", async () => {
    fetchMock.mockResolvedValue(new Response("err", { status: 500 }));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(req(form()));
    expect(res.status).toBe(502);
  });

  it("risponde 502 se manca la chiave Resend", async () => {
    delete process.env.RESEND_API_KEY;
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(req(form()));
    expect(res.status).toBe(502);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
