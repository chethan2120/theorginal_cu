import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary } from "../components/ui.tsx";

const points = [
  {
    title: "The weight is the price",
    text: "Each spice and dry fruit is listed at 100 g, 250 g, 500 g and 1 kg. Gift boxes use Classic, Grand and Reserve. The figure on the page is the one that goes into the bag.",
  },
  {
    title: "The ingredient stays visible",
    text: "Single spices are listed as themselves. Where a photograph is only a stand-in, the product page says so. Blends and hampers mark sample contents until the client confirms the pack.",
  },
  {
    title: "Nothing is invented to sound grander",
    text: "There are no licence numbers, farm names or nutrition tables on this shop. Those appear only when the client supplies the documents.",
  },
  {
    title: "The checkout tells the truth",
    text: "You can place an order and see it under Profile. The payment choices are labels. No card is charged and no courier is booked.",
  },
];

export default function WhyUs() {
  return (
    <>
      <Seo
        title="Why us — THE ORIGINAL"
        description="Why THE ORIGINAL shows weights, ingredients and a checkout that does not pretend a payment went through."
      />
      <section className="bg-ivory">
        <PageWidth className="grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Why us</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight font-medium text-navy">
              A clearer shop, not a louder one.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-mute">
              THE ORIGINAL is built so a customer can see the product, choose a size, and know what the total includes. The catalogue is still sample stock. The way the shop behaves is already in place.
            </p>
            <Link to="/shop" className={`${btnPrimary} mt-8`}>
              Browse the shop
            </Link>
          </div>
          <div className="shape-circle mx-auto aspect-square w-full max-w-md overflow-hidden bg-sand shadow-[0_20px_46px_rgba(12,27,51,0.12)]">
            <img
              src="/images/editorial/hero-spices.jpg"
              alt="Spoons of turmeric, chilli, cardamom, cumin and other spices"
              className="h-full w-full object-cover"
            />
          </div>
        </PageWidth>
      </section>
      <PageWidth className="grid gap-8 py-16 md:grid-cols-2">
        {points.map((point, index) => (
          <article key={point.title} className="rounded-[1.6rem] border border-line bg-paper px-6 py-6">
            <p className="text-[12px] tracking-[0.16em] uppercase text-gold">0{index + 1}</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">{point.title}</h2>
            <p className="mt-3 text-sm leading-7 text-mute">{point.text}</p>
          </article>
        ))}
      </PageWidth>
    </>
  );
}
