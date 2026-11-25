import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary } from "../components/ui.tsx";

export default function About() {
  return (
    <>
      <Seo
        title="About us — THE ORIGINAL"
        description="THE ORIGINAL is a customer shop for spices, dry fruits and gift boxes. This page is ready for the client’s own history."
      />
      <PageWidth className="grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="text-[12px] tracking-[0.2em] uppercase text-gold">About us</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight font-medium text-navy">
            The shop, before the story is filled in.
          </h1>
          <p className="mt-5 text-base leading-7 text-mute">
            THE ORIGINAL is set up here as a customer-facing shop for spices, dry fruits, nuts, seeds and gift boxes. The navy and gold mark is the client’s. The words around it are a draft, because a founding year, a founder’s name and a workshop address have not been provided.
          </p>
          <p className="mt-4 text-base leading-7 text-mute">
            What is already working is the shopping itself: a catalogue you can search, a weight that changes the price, a bag that survives a refresh, a wishlist, and a checkout that records an order without pretending a payment went through.
          </p>
          <Link to="/shop" className={`${btnPrimary} mt-8`}>
            Browse the catalogue
          </Link>
        </div>
        <div className="aspect-[5/4] bg-sand">
          <img
            src="/images/editorial/market-stall.jpg"
            alt="Bins of whole spices and dry fruits at a market stall"
            className="h-full w-full object-cover"
          />
        </div>
      </PageWidth>
      <section className="bg-ivory">
        <PageWidth className="grid gap-10 py-16 md:grid-cols-3">
          <article>
            <h2 className="font-serif text-3xl text-navy">What we sell</h2>
            <p className="mt-3 text-sm leading-6 text-mute">
              Everyday spices, dry fruits, a small seed range, and three sample gift assortments. Each product is a record that can be replaced when the real pack list arrives.
            </p>
          </article>
          <article>
            <h2 className="font-serif text-3xl text-navy">What we will not invent</h2>
            <p className="mt-3 text-sm leading-6 text-mute">
              Licence numbers, organic seals, farm names and nutrition tables stay off the page until the client supplies them.
            </p>
          </article>
          <article>
            <h2 className="font-serif text-3xl text-navy">How to reach the house</h2>
            <p className="mt-3 text-sm leading-6 text-mute">
              Phone, email and street address are waiting on the contact page. The form there checks the message and keeps it on this device.
            </p>
          </article>
        </PageWidth>
      </section>
    </>
  );
}
