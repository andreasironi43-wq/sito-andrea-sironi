"use client";

import { useEffect, useRef } from "react";

/* Tre scene sullo stesso tratto di scroll: pretrattamento, applicazione, cottura e controlli. */
const SCENES = [0, 0.56, 0.76, 1];

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const sm = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); };
const bump = (x: number) => 4 * x * (1 - x); // 0 → 1 → 0: visibile solo mentre il fronte avanza

/* Pezzo e particelle in unità SVG; VB = inquadratura del viewBox (x, y, w, h) */
const VB = [24, 0, 252, 372];
const LUGS = [[58, 104], [242, 104], [58, 316], [242, 316]];
function inBody(x: number, y: number) {
  const inRect = x >= 64 && x <= 236 && y >= 62 && y <= 358 &&
    !((x < 88 || x > 212) && (y < 86 || y > 334) && Math.hypot(x - (x < 150 ? 88 : 212), y - (y < 200 ? 86 : 334)) > 24);
  const inLug = LUGS.some(([cx, cy]) => Math.hypot(x - cx, y - cy) < 25) || (x >= 40 && x <= 260 && ((y >= 96 && y <= 112) || (y >= 308 && y <= 324)));
  const inHole = LUGS.some(([cx, cy]) => Math.hypot(x - cx, y - cy) < 11) || Math.hypot(x - 150, y - 210) < 14;
  return (inRect || inLug) && !inHole;
}

type P = { sx: number; sy: number; cx: number; cy: number; tx: number; ty: number; t0: number; c: number };
function makeParticles(n: number): P[] {
  let seed = 7;
  const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const out: P[] = [];
  while (out.length < n) {
    const tx = 40 + r() * 220, ty = 62 + r() * 296;
    if (!inBody(tx, ty)) continue;
    const sy = 200 + (r() - 0.5) * 220, sx = -60;
    // linee di campo: i bersagli sul lato lontano vengono raggiunti girando attorno al pezzo
    const far = tx > 190;
    const cx = far ? 150 + (r() - 0.5) * 60 : (sx + tx) / 2;
    const cy = far ? (ty < 210 ? 20 : 390) : (sy + ty) / 2 + (r() - 0.5) * 60;
    out.push({ sx, sy, cx, cy, tx, ty, t0: 0.03 + 0.72 * (out.length / n) + (r() - 0.5) * 0.06, c: Math.floor(r() * 3) });
  }
  return out;
}
const DEP = ["#2a5a96", "#3266a8", "#22508a"];

export default function CycleSceneDriver({ counts }: { counts: number[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest(".act") as HTMLElement | null;
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { root.classList.add("static"); return; }
    root.classList.add("is-live");

    const track = root.querySelector<HTMLElement>(".act-track")!;
    const sticky = root.querySelector<HTMLElement>(".act-sticky")!;
    const box = root.querySelector<HTMLElement>(".act-piece")!;
    const canvas = root.querySelector<HTMLCanvasElement>(".act-canvas")!;
    const ctx = canvas.getContext("2d");
    const caps = Array.from(root.querySelectorAll<HTMLElement>(".act-cap"));
    const ticks = Array.from(root.querySelectorAll<HTMLElement>(".act-ticks i"));
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-block]"));
    const parts = makeParticles(1100);

    let top = 0, travel = 1, lastW = innerWidth, visible = true, raf = 0;
    let step = -1, block = -1, lastPB = -1, lastPC = -1;
    let cw = 0, ch = 0, s = 1, ox = 0, oy = 0;
    const coarse = matchMedia("(pointer: coarse)").matches;

    const measure = () => {
      const navH = parseFloat(getComputedStyle(sticky).top) || 0;
      top = track.getBoundingClientRect().top + scrollY - navH;
      travel = Math.max(1, track.offsetHeight - sticky.offsetHeight);
      const dpr = Math.min(2, devicePixelRatio || 1);
      cw = box.clientWidth; ch = box.clientHeight;
      canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      s = Math.min(cw / VB[2], ch / VB[3]); ox = (cw - VB[2] * s) / 2 - VB[0] * s; oy = (ch - VB[3] * s) / 2 - VB[1] * s;
      lastPB = lastPC = -1;
    };

    const set = (k: string, v: number | string) => root.style.setProperty(k, typeof v === "number" ? v.toFixed(4) : v);

    const draw = (pb: number, pc: number) => {
      if (!ctx || (pb === lastPB && pc === lastPC)) return;
      lastPB = pb; lastPC = pc;
      ctx.clearRect(0, 0, cw, ch);
      if (pb <= 0) return;
      const sz = 1.9 * s;
      for (const p of parts) {
        const u = (pb - p.t0) / 0.13;
        if (u <= 0) continue;
        let x = p.tx, y = p.ty;
        if (u < 1) {
          const e = u * u; // accelera verso il pezzo, come attratta dal campo
          const a = (1 - e) * (1 - e), b = 2 * (1 - e) * e, c = e * e;
          x = a * p.sx + b * p.cx + c * p.tx; y = a * p.sy + b * p.cy + c * p.ty;
          ctx.fillStyle = "#5b8fd0"; ctx.globalAlpha = 0.85;
        } else { ctx.fillStyle = DEP[p.c]; ctx.globalAlpha = 0.92; }
        ctx.fillRect(ox + x * s, oy + y * s, sz, sz);
      }
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      raf = 0;
      const p = clamp((scrollY - top) / travel);
      const pa = clamp(p / SCENES[1]);
      const pb = clamp((p - SCENES[1]) / (SCENES[2] - SCENES[1]));
      const pc = clamp((p - SCENES[2]) / (SCENES[3] - SCENES[2]));
      set("--p", p);

      // Scena 1 · pretrattamento: ogni fase ha il suo cambiamento
      const a = pa * counts[0];
      const seg = (k: number) => clamp(a - k);
      const flow = 0.6 * a + 3 * seg(2) + 2 * seg(4) + 4 * seg(6); // passaggi d'acqua: 3 di rete, 2, 4 in demineralizzata
      const f = flow % 1;
      set("--swing", 1 - sm(a));
      set("--grime", 1 - sm(a - 1));
      set("--copper", 1 - sm(a - 3));
      set("--bright", 0.5 * sm(a - 3));
      set("--wet", Math.min(sm((a - 1) / 0.5), 1 - sm(a - 8)));
      set("--flowy", `${(-200 + f * 200).toFixed(2)}px`);
      set("--flowx", `${(Math.sin(flow * Math.PI * 2) * 6).toFixed(2)}px`);
      set("--drop", Math.min(sm((a - 1.6) / 0.6), 1 - sm(a - 8)));
      const pv = sm(a - 5), se = sm(a - 7);
      set("--passiv", pv); set("--pedge", bump(pv));
      set("--seal", se); set("--sedge", bump(se));

      // Scena 2 · applicazione: polvere attratta dal campo elettrostatico
      // Scena 3 · cottura e controlli: il film si assesta, un riflesso, poi i controlli
      const cure = sm(pc / 0.3);
      const g = clamp((pc - 0.08) / 0.3);
      const pw = sm((pb - 0.4) / 0.55) * (1 - cure);
      set("--powder", pw);
      set("--coat", Math.max(pw, cure));
      set("--canvas", (pb > 0 ? 1 : 0) * (1 - cure));
      set("--cure", cure);
      set("--gloss", `${(g * 420).toFixed(1)}px`);
      set("--glossop", g > 0 && g < 1 ? 1 : 0);
      set("--c1", sm((pc - 0.36) / 0.12));
      set("--c2", sm((pc - 0.46) / 0.12));
      set("--tag", sm((pc - 0.7) / 0.15));
      if (visible) draw(pb, pc);

      // Didascalie, tacche e contatore: cambi a tempo (transizioni CSS), non legati allo scroll
      const bi = p < SCENES[1] ? 0 : p < SCENES[2] ? 1 : 2;
      const local = [pa, pb, pc][bi];
      const st = counts.slice(0, bi).reduce((x, y) => x + y, 0) + Math.min(counts[bi] - 1, Math.floor(local * counts[bi]));
      if (st !== step) {
        step = st;
        caps.forEach((c, i) => c.classList.toggle("on", i === st));
        ticks.forEach((t, i) => { t.className = i < st ? "done" : i === st ? "cur" : ""; });
      }
      if (bi !== block) {
        block = bi;
        blocks.forEach((b) => b.classList.toggle("on", Number(b.dataset.block) === bi));
      }
    };

    const req = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onResize = () => {
      // Su touch la barra di Safari cambia solo innerHeight: non rimisurare
      if (coarse && innerWidth === lastW) return;
      lastW = innerWidth; measure(); req();
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { lastPB = -1; req(); } }, { rootMargin: "100px 0px" });
    const ro = new ResizeObserver(() => { measure(); req(); });

    measure(); frame();
    io.observe(root); ro.observe(track);
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", onResize);
    addEventListener("load", onResize);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      removeEventListener("scroll", req); removeEventListener("resize", onResize); removeEventListener("load", onResize);
      root.classList.remove("is-live");
    };
  }, [counts]);

  return <span ref={ref} hidden />;
}
