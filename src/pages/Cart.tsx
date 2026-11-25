import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import {
  PageWidth,
  ProductImage,
  QuantityControl,
  btnPrimary,
  fieldClass,
} from "../components/ui.tsx";
import { useCart } from "../context/CartContext.tsx";
import { DELIVERY_FEE, FREE_DELIVERY_AT } from "../data/commerce.ts";
import { formatINR } from "../lib/format.ts";
import { useState, type FormEvent } from "react";

export default function Cart() {
  const { lines, summary, setQuantity, removeItem, promoCode, promoError, applyPromo, clearPromo } = useCart();
  const [code, setCode] = useState("");
  const afterDiscount = Math.max(0, summary.subtotal - summary.discount);
  const remaining = Math.max(0, FREE_DELIVERY_AT - afterDiscount);
  const progress = afterDiscount === 0 ? 0 : Math.min(100, (afterDiscount / FREE_DELIVERY_AT) * 100);

  function onPromo(event: FormEvent) {
    event.preventDefault();
    applyPromo(code);
  }

  return (
    <PageWidth className="py-12">
      <Seo
        title="Shopping bag — THE ORIGINAL"
        description="Review the spices and dry fruits in your bag, adjust quantities and continue to checkout."
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Your bag</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">Shopping cart</h1>

      {lines.length === 0 ? (
        <div className="mt-10 border border-line bg-ivory px-6 py-14">
          <h2 className="font-serif text-3xl text-navy">The bag is empty.</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-mute">
            Add a weight from the shop. The bag stays on this device if you refresh the page.
          </p>
          <Link to="/shop" className={`${btnPrimary} mt-6`}>
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.variantId}`} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[120px_minmax(0,1fr)_auto]">
                <Link to={`/product/${line.product.slug}`} className="block aspect-square bg-sand">
                  <ProductImage src={line.product.image} alt="" className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0">
                  <Link to={`/product/${line.product.slug}`} className="font-serif text-2xl text-navy hover:text-gold">
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-mute">
                    {line.variant.label} · {formatINR(line.variant.price)} each
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <QuantityControl
                      value={line.quantity}
                      onChange={(quantity) => setQuantity(line.productId, line.variantId, quantity)}
                    />
                    <button
                      type="button"
                      className="text-[12px] tracking-[0.12em] uppercase text-mute hover:text-danger"
                      onClick={() => removeItem(line.productId, line.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="col-span-2 text-sm font-medium sm:col-span-1 sm:text-right">
                  {formatINR(line.lineTotal)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-line bg-ivory p-6">
            <h2 className="font-serif text-3xl text-navy">Summary</h2>
            <div className="mt-5">
              <div className="h-1 bg-sand">
                <div className="h-1 bg-navy" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-sm text-mute">
                {remaining === 0
                  ? "Delivery is free on this order."
                  : `Add ${formatINR(remaining)} for free delivery. Delivery is ${formatINR(DELIVERY_FEE)} below ${formatINR(FREE_DELIVERY_AT)}.`}
              </p>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt>Subtotal</dt>
                <dd>{formatINR(summary.subtotal)}</dd>
              </div>
              {summary.discount > 0 ? (
                <div className="flex justify-between gap-4">
                  <dt>Discount {promoCode ? `(${promoCode})` : ""}</dt>
                  <dd>−{formatINR(summary.discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt>Delivery</dt>
                <dd>{summary.delivery === 0 ? "Free" : formatINR(summary.delivery)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd>{formatINR(summary.total)}</dd>
              </div>
            </dl>

            <form onSubmit={onPromo} className="mt-6">
              <label htmlFor="promo" className="text-[12px] tracking-[0.14em] uppercase text-mute">
                Promo code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="promo"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="ORIGINAL10"
                  className={fieldClass}
                />
                <button type="submit" className="border border-navy px-3 text-[12px] tracking-[0.12em] uppercase">
                  Apply
                </button>
              </div>
              {promoError ? <p className="mt-2 text-sm text-danger" role="alert">{promoError}</p> : null}
              {promoCode ? (
                <button type="button" className="mt-2 text-sm text-mute underline" onClick={clearPromo}>
                  Remove {promoCode}
                </button>
              ) : (
                <p className="mt-2 text-xs text-mute">Sample code: ORIGINAL10 takes 10% off the goods.</p>
              )}
            </form>

            <Link to="/checkout" className={`${btnPrimary} mt-6 w-full`}>
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </PageWidth>
  );
}
