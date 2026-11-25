import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, ProductImage, btnGhost, btnPrimary } from "../components/ui.tsx";
import { useAccount } from "../context/AccountContext.tsx";
import { formatDate, formatINR } from "../lib/format.ts";

export default function OrderConfirmation() {
  const { id } = useParams();
  const { getOrder } = useAccount();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <PageWidth className="py-20">
        <Seo title="Order not found — THE ORIGINAL" description="This order is not saved on this device." />
        <h1 className="font-serif text-5xl text-navy">This order is not on this device.</h1>
        <p className="mt-4 max-w-lg text-sm leading-6 text-mute">
          Orders are stored in this browser. A different browser, or a cleared site data store, will not show them.
        </p>
        <Link to="/account" className={`${btnPrimary} mt-8`}>
          View orders on this device
        </Link>
      </PageWidth>
    );
  }

  return (
    <PageWidth className="py-12">
      <Seo
        title={`Order ${order.id} — THE ORIGINAL`}
        description="Your demonstration order has been recorded on this device. No payment was taken."
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Order placed</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">Thank you. The order is recorded.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-mute">
        No payment was collected and no courier was booked. The confirmation below is saved in this browser so you can review it later.
      </p>

      <div className="mt-10 grid gap-10 border border-line bg-ivory p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-[12px] tracking-[0.14em] uppercase text-mute">Order number</dt>
              <dd className="mt-1 font-medium">{order.id}</dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.14em] uppercase text-mute">Date</dt>
              <dd className="mt-1">{formatDate(order.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.14em] uppercase text-mute">Status</dt>
              <dd className="mt-1">Placed — demonstration</dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.14em] uppercase text-mute">Payment preference</dt>
              <dd className="mt-1">{order.paymentMethod}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <h2 className="text-[12px] tracking-[0.14em] uppercase text-mute">Deliver to</h2>
            <p className="mt-2 text-sm leading-6">
              {order.address.fullName}
              <br />
              {order.address.line1}
              {order.address.line2 ? <><br />{order.address.line2}</> : null}
              <br />
              {order.address.city}, {order.address.state} {order.address.pincode}
              <br />
              {order.address.phone}
              <br />
              {order.address.email}
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl text-navy">Items</h2>
          <ul className="mt-4 space-y-4">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                <ProductImage src={item.image} alt="" className="h-16 w-16 object-cover" />
                <div className="min-w-0 flex-1">
                  <Link to={`/product/${item.slug}`} className="text-sm hover:text-gold">
                    {item.name}
                  </Link>
                  <p className="text-xs text-mute">
                    {item.variantLabel} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm">{formatINR(item.unitPrice * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatINR(order.subtotal)}</dd></div>
            {order.discount > 0 ? <div className="flex justify-between"><dt>Discount</dt><dd>−{formatINR(order.discount)}</dd></div> : null}
            <div className="flex justify-between"><dt>Delivery</dt><dd>{order.delivery === 0 ? "Free" : formatINR(order.delivery)}</dd></div>
            <div className="flex justify-between text-base font-medium"><dt>Total</dt><dd>{formatINR(order.total)}</dd></div>
          </dl>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/shop" className={btnPrimary}>Continue shopping</Link>
        <Link to="/account" className={btnGhost}>My orders</Link>
      </div>
    </PageWidth>
  );
}
