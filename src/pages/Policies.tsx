import type { ReactNode } from "react";
import { Seo } from "../components/Seo.tsx";
import { PageWidth } from "../components/ui.tsx";
import { DELIVERY_FEE, FREE_DELIVERY_AT } from "../data/commerce.ts";
import { formatINR } from "../lib/format.ts";

function Policy({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <PageWidth className="py-16">
      <Seo title={`${title} — THE ORIGINAL`} description={description} />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">{kicker}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl font-medium text-navy">{title}</h1>
      <p className="mt-4 max-w-2xl border border-line bg-ivory px-4 py-3 text-sm leading-6 text-mute">
        Draft for the client to approve. This is not a live legal policy, and it should be reviewed before the shop takes real orders.
      </p>
      <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-ink">{children}</div>
    </PageWidth>
  );
}

export function ShippingPolicy() {
  return (
    <Policy
      kicker="Shipping"
      title="Shipping policy"
      description="Draft shipping terms for THE ORIGINAL, including the sample delivery charge used in checkout."
    >
      <p>
        Checkout currently adds a delivery charge of {formatINR(DELIVERY_FEE)}. The charge becomes zero when the goods, after any discount, reach {formatINR(FREE_DELIVERY_AT)}. Both figures are configuration, not a quote from a courier.
      </p>
      <p>
        No shipping account is connected. Placing an order does not create a shipment, a tracking number, or a delivery date. A delivery window will be published here only after the client names the service and the areas it covers.
      </p>
      <p>
        Until then, treat any order on this site as a demonstration record stored in the browser that placed it.
      </p>
    </Policy>
  );
}

export function ReturnPolicy() {
  return (
    <Policy
      kicker="Returns"
      title="Return and refund policy"
      description="Draft return and refund terms for THE ORIGINAL. Not a live promise."
    >
      <p>
        A proposed rule, for the client to accept or rewrite: unopened packs may be returned within 7 days of delivery, once a real delivery exists. Opened food packs would not be taken back, except where the pack arrived damaged.
      </p>
      <p>
        Refunds are not processed on this site. There is no payment gateway, so there is no charge to reverse. When a gateway is added, this page should name the method and the number of days a refund takes.
      </p>
      <p>
        Damaged or wrong packs should be reported with photographs to the contact address the client supplies. That address is not on the site yet.
      </p>
    </Policy>
  );
}

export function PrivacyPolicy() {
  return (
    <Policy
      kicker="Privacy"
      title="Privacy policy"
      description="How THE ORIGINAL currently stores customer details: in the browser, not on a server."
    >
      <p>
        This shop does not send personal details to a server. The bag, wishlist, newsletter address, contact notes, account name and placed orders are saved in local storage on the device you are using.
      </p>
      <p>
        Clearing the browser’s site data removes them. They are not shared with a payment company or a courier, because those services are not connected.
      </p>
      <p>
        If the client later adds hosting, payments or email, this page must be rewritten to name what is collected, why, and how long it is kept. Do not treat the current text as cover for a future backend.
      </p>
    </Policy>
  );
}

export function Terms() {
  return (
    <Policy
      kicker="Terms"
      title="Terms and conditions"
      description="Draft terms for shopping at THE ORIGINAL. Prices and catalogue entries are samples."
    >
      <p>
        The catalogue, prices, photographs and gift contents are samples for reviewing the shop. They are not an offer of those exact goods until the client replaces them with the stock it sells.
      </p>
      <p>
        An order placed here is a demonstration. It does not create a contract to deliver goods and it does not take payment. The payment choices on the checkout page are labels only.
      </p>
      <p>
        The client should add its legal name, place of business and governing law before these terms are shown to paying customers. Those details have not been supplied.
      </p>
    </Policy>
  );
}
