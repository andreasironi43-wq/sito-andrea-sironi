import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { ALLOWED_EXT, ALLOWED_MIME, MAX_FILE_BYTES, extOf } from "@/lib/quote";

export const runtime = "nodejs";

/** Rilascia token di upload diretto su Vercel Blob per allegati oltre 4 MB. */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Upload non configurato" }, { status: 503 });
  }
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!(ALLOWED_EXT as readonly string[]).includes(extOf(pathname))) throw new Error("Formato non ammesso");
        return {
          allowedContentTypes: ALLOWED_MIME.filter(Boolean),
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload non riuscito" }, { status: 400 });
  }
}
