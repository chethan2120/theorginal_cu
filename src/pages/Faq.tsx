import { useState } from "react";
import { Seo } from "../components/Seo.tsx";
import { PageWidth } from "../components/ui.tsx";
import { DELIVERY_FEE, FREE_DELIVERY_AT } from "../data/commerce.ts";
import { formatINR } from "../lib/format.ts";

const items = [
  {
    q: "Are these the final products and prices?",
    a: "No. The catalogue is sample data so the shop can be reviewed. Names, weights, prices and photographs are structured so the client’s own list can replace them.",
  },
  {
    q: "How does the weight change the price?",
    a: "On a product page, choose 100 g, 250 g, 500 g or 1 kg where those sizes exist. The price shown is for that size, then multiplied by the quantity. Gift boxes use Classic, Grand and Reserve instead of grams.",
  },
  {
    q: "Does the bag stay if I refresh?",
    a: "Yes. The bag, wishlist, saved account details and placed orders are stored in this browser.",
  },
  {
    q: "What does delivery cost?",
    a: `The sample rule is ${formatINR(DELIVERY_FEE)}, and it drops to zero when the goods, after any discount, reach ${formatINR(FREE_DELIVERY_AT)}. No courier account is connected, so this is a configured charge, not a live shipping quote.`,
  },
  {
    q: "Will I be charged at checkout?",
    a: "No. UPI, card, net banking and cash on delivery are shown so the flow can be tried. Card numbers and UPI IDs are not collected, and nothing is sent to a bank.",
  },
  {
    q: "Is there an account login?",
    a: "You can save a name, email and mobile on this device. There is no password and no server account. Orders placed in this browser appear under My Account.",
  },
  {
    q: "Where are the nutrition tables?",
    a: "They are not invented. Each product says that nutrition will be added when the client provides the figures from the pack.",
  },
  {
    q: "Can I return an order?",
    a: "The returns page is a draft for the client to approve. It is not a live promise, because no fulfilment partner is connected.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <PageWidth className="py-16">
      <Seo
        title="FAQ — THE ORIGINAL"
        description="Answers about weights, the shopping bag, delivery charges and the demonstration checkout at THE ORIGINAL."
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">FAQ</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">Questions about this shop.</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item, index) => {
          const expanded = open === index;
          return (
            <div key={item.q}>
              <h2>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-2xl text-navy"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  {item.q}
                  <span aria-hidden="true" className="text-base text-mute">{expanded ? "–" : "+"}</span>
                </button>
              </h2>
              {expanded ? <p className="max-w-3xl pb-5 text-sm leading-7 text-mute">{item.a}</p> : null}
            </div>
          );
        })}
      </div>
    </PageWidth>
  );
}
