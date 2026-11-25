import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard.tsx";
import { Seo } from "../components/Seo.tsx";
import {
  Breadcrumbs,
  PageWidth,
  ProductImage,
  QuantityControl,
  btnGhost,
  btnPrimary,
} from "../components/ui.tsx";
import { useCart } from "../context/CartContext.tsx";
import { useWishlist } from "../context/WishlistContext.tsx";
import { nutritionNote } from "../data/commerce.ts";
import { getProduct, relatedProducts } from "../data/products.ts";
import { formatINR } from "../lib/format.ts";
import { IconHeart } from "../components/Icons.tsx";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const [variantId, setVariantId] = useState(product?.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setVariantId(product?.variants[0]?.id ?? "");
    setQuantity(1);
  }, [product]);

  const variant = useMemo(
    () => product?.variants.find((item) => item.id === variantId) ?? product?.variants[0],
    [product, variantId],
  );

  if (!product || !variant) {
    return (
      <PageWidth className="py-20">
        <Seo title="Product not found — THE ORIGINAL" description="This product is not in the sample catalogue." />
        <h1 className="font-serif text-5xl text-navy">This product is not in the catalogue.</h1>
        <p className="mt-4 text-mute">The link may be old, or the sample list does not include it.</p>
        <Link to="/shop" className={`${btnPrimary} mt-8`}>
          Back to the shop
        </Link>
      </PageWidth>
    );
  }

  const saved = wishlist.has(product.id);
  const lineTotal = variant.price * quantity;
  const isGift = product.categories.includes("gifts");
  const related = relatedProducts(product);

  return (
    <PageWidth className="py-10">
      <Seo
        title={`${product.name} — THE ORIGINAL`}
        description={product.summary}
      />
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="aspect-[4/5] bg-sand">
            <ProductImage src={product.image} alt={product.imageAlt} className="h-full w-full object-cover" />
          </div>
          {product.imageNote ? <p className="mt-3 text-sm leading-6 text-mute">{product.imageNote}</p> : null}
        </div>

        <div>
          <p className="text-[12px] tracking-[0.18em] uppercase text-gold">
            {isGift ? "Gift box" : "Sold by weight"}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-none font-medium text-navy">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-mute">{product.description}</p>
          <p className="mt-6 font-serif text-4xl text-navy">{formatINR(lineTotal)}</p>
          <p className="mt-1 text-sm text-mute">
            {formatINR(variant.price)} for {variant.label}
            {quantity > 1 ? ` · ${quantity} selected` : ""}
          </p>

          <fieldset className="mt-8">
            <legend className="text-[12px] tracking-[0.14em] uppercase text-mute">
              {isGift ? "Box size" : "Weight"}
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label={isGift ? "Box size" : "Weight"}>
              {product.variants.map((item) => {
                const selected = item.id === variant.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`border px-3 py-3 text-left ${
                      selected ? "border-navy bg-navy text-paper" : "border-line bg-paper text-ink hover:border-navy"
                    }`}
                    onClick={() => setVariantId(item.id)}
                  >
                    <span className="block text-sm">{item.label}</span>
                    <span className={`mt-1 block text-xs ${selected ? "text-paper/75" : "text-mute"}`}>
                      {formatINR(item.price)}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-sm text-mute">{variant.detail}</p>
          </fieldset>

          <div className="mt-6">
            <p className="text-[12px] tracking-[0.14em] uppercase text-mute">Quantity</p>
            <div className="mt-3">
              <QuantityControl value={quantity} onChange={setQuantity} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className={btnPrimary}
              onClick={() => addItem(product.id, variant.id, quantity)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                addItem(product.id, variant.id, quantity);
                navigate("/checkout");
              }}
            >
              Buy now
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-3 text-[12px] tracking-[0.14em] uppercase text-navy"
              aria-pressed={saved}
              onClick={() => wishlist.toggle(product.id)}
            >
              <IconHeart filled={saved} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
        <section>
          <h2 className="font-serif text-3xl text-navy">Ingredients</h2>
          <ul className="mt-4 space-y-1 text-sm leading-6 text-ink">
            {product.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {product.ingredientNote ? <p className="mt-3 text-sm leading-6 text-mute">{product.ingredientNote}</p> : null}
          {product.contents ? (
            <div className="mt-5">
              <h3 className="text-[12px] tracking-[0.14em] uppercase text-mute">Sample contents</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {product.contents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
        <section>
          <h2 className="font-serif text-3xl text-navy">Storage</h2>
          <p className="mt-4 text-sm leading-6 text-mute">{product.storage}</p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-navy">Nutrition</h2>
          <p className="mt-4 text-sm leading-6 text-mute">{nutritionNote}</p>
        </section>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-4xl text-navy">Alongside this</h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PageWidth>
  );
}
