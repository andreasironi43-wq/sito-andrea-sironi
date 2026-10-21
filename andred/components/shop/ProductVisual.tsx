import Image from "next/image";
import type { Product } from "@/lib/commerce";
import { HoodieDrawing, ShirtDrawing } from "../Drawings";
import Placeholder from "../Placeholder";

/** Prima foto del prodotto; se manca, il disegno tecnico; se manca anche quello, un segnaposto. */
export default function ProductVisual({
  product,
  placeholderLabel,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  product: Product;
  placeholderLabel: string;
  priority?: boolean;
  sizes?: string;
}) {
  const img = product.images[0];
  if (img) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-stone bg-stone/25">
        <Image src={img.url} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  if (product.drawing) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-stone">
        <div className="object-drawing absolute inset-[8%]">
          {product.drawing === "shirt" ? (
            <ShirtDrawing title={product.drawingAlt} />
          ) : (
            <HoodieDrawing title={product.drawingAlt} />
          )}
        </div>
        <p aria-hidden="true" className="mono absolute top-3 left-3 text-muted">
          Fig. {product.code}
        </p>
      </div>
    );
  }
  return <Placeholder ratio="4/5" label={placeholderLabel} caption={product.title} />;
}
