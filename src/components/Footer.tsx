import { Link } from "react-router-dom";
import { NewsletterForm } from "./NewsletterForm.tsx";

const shopLinks = [
  { label: "All products", to: "/shop" },
  { label: "Spices", to: "/shop?category=spices" },
  { label: "Dry fruits", to: "/shop?category=dry-fruits" },
  { label: "Nuts and seeds", to: "/shop?category=nuts-seeds" },
  { label: "Best sellers", to: "/shop?sort=featured" },
];

const helpLinks = [
  { label: "Heritage", to: "/heritage" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Shipping", to: "/shipping" },
  { label: "Returns", to: "/returns" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

const notes = [
  "Spices, dry fruits, nuts and seeds.",
  "Weights from 100 g to 1 kg.",
  "Delivery ₹79, free from ₹1,499.",
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy text-paper">
      <div className="footer-copy relative z-10">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img src="/brand/logo.jpg" alt="THE ORIGINAL" className="h-14 w-14 rounded-full object-cover" />
              <p className="font-serif text-2xl tracking-[0.14em]">THE ORIGINAL</p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-paper/80">
              A shop for spices and dry fruits. The catalogue is sample stock, ready for the client’s own packs and prices.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-paper/75">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="mt-5 max-w-sm">
              <h2 className="text-[12px] tracking-[0.18em] text-gold-line uppercase">Notes by email</h2>
              <div className="mt-3">
                <NewsletterForm id="footer-email" compact />
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-[12px] tracking-[0.18em] text-gold-line uppercase">Shop</h2>
            <ul className="mt-3 space-y-2">
              {shopLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-paper/85 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h2 className="text-[12px] tracking-[0.18em] text-gold-line uppercase">Visit</h2>
            <ul className="mt-3 space-y-2">
              {helpLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-paper/85 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 px-5 py-4 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} THE ORIGINAL. Sample storefront.</p>
            <p>Payments and shipping are not connected.</p>
          </div>
        </div>
      </div>
      <p aria-hidden="true" className="footer-mark">
        THE ORIGINAL
      </p>
    </footer>
  );
}
