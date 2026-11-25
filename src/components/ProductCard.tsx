import { useCart } from "../context/CartContext.tsx";
import { useWishlist } from "../context/WishlistContext.tsx";
import { defaultVariant, lowestPrice } from "../data/products.ts";
import { formatINR } from "../lib/format.ts";
import type { CategoryId, Product } from "../types.ts";
import { IconHeart } from "./Icons.tsx";
import { NotchedProjectCard } from "./ui/notched-project-card.tsx";

const categoryLabel: Record<CategoryId, string> = {
  spices: "Spice",
  "dry-fruits": "Dry fruit",
  "nuts-seeds": "Nuts & seeds",
  gifts: "Gift box",
};

export function ProductCard({
  product,
  surface = "var(--color-paper)",
}: {
  product: Product;
  surface?: string;
}) {
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const variant = defaultVariant(product);
  const saved = wishlist.has(product.id);
  const kind = categoryLabel[product.categories[0]];

  return (
    <article className="flex h-full flex-col">
      <NotchedProjectCard
        href={`/product/${product.slug}`}
        title={product.name}
        description={product.summary}
        image={product.image}
        imageAlt={product.imageAlt}
        badge={product.bestseller ? "Often chosen" : undefined}
        tags={[kind, variant.label]}
        surface={surface}
        accent="#8d6e45"
        accentForeground="#fbf9f5"
      />
      {product.photoCaption ? <p className="mt-3 text-xs text-gold">{product.photoCaption}</p> : null}
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-ink">
          From <span className="font-medium">{formatINR(lowestPrice(product))}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-full border border-line ${saved ? "bg-navy text-paper" : "text-navy hover:border-navy"}`}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            onClick={() => wishlist.toggle(product.id)}
          >
            <IconHeart filled={saved} />
          </button>
          <button
            type="button"
            className="border border-navy px-3 py-2 text-[11px] tracking-[0.14em] text-navy uppercase transition-colors hover:bg-navy hover:text-paper"
            onClick={() => addItem(product.id, variant.id, 1)}
          >
            Add {variant.label}
          </button>
        </div>
      </div>
    </article>
  );
}
