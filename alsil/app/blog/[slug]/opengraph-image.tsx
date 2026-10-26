import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { getPost } from "@/lib/blog";

export const alt = "AL.SIL. – Blog";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getPost((await params).slug);
  return renderOg(item?.title || "Blog", "AL.SIL. · Blog");
}
