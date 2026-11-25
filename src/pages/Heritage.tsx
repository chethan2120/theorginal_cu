import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal.tsx";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary } from "../components/ui.tsx";

const holdings = [
  { title: "Spices", text: "Powders, pods and whole seeds. Each one is listed on its own, with a weight that sets the price." },
  { title: "Dry fruits", text: "Raisins, dates and figs, sold in the same sizes as the spices." },
  { title: "Nuts and seeds", text: "Almonds, cashews, pistachios, walnuts and pumpkin seeds. Several nuts also sit in the dry-fruit list." },
  { title: "The mark", text: "The navy square and the gold frame are the client’s. The words around them stay a draft until the family’s story is supplied." },
];

const chapters = [
  {
    title: "The jars",
    text: "The shop is built around single spices, dry fruits, nuts and seeds. A blend or a gift box says so on the page, and says when the contents are still a sample.",
    image: "/images/editorial/hero-spices.jpg",
    alt: "An arrangement of whole and ground spices",
  },
  {
    title: "The stall",
    text: "Photographs here are stand-ins until the client’s own packs are photographed. Where a picture shows another shop’s goods, the product page names that.",
    image: "/images/editorial/market-stall.jpg",
    alt: "Open bins of spices and dry fruits at a market stall",
  },
  {
    title: "The tin",
    text: "Dry fruits and nuts sit beside the spices, with the same weights: 100 g, 250 g, 500 g and 1 kg. The price on the page is the price for the size you choose.",
    image: "/images/editorial/dry-fruit-still.jpg",
    alt: "A still life of mixed dry fruits",
  },
  {
    title: "The mark",
    text: "THE ORIGINAL is printed as a navy square with a gold frame. It names the shop. It does not stand in for a licence, a farm, or a year of founding. Those lines stay empty until the papers arrive.",
    image: "/images/editorial/dried-chillies.jpg",
    alt: "A pile of whole dried red chillies",
  },
];

export default function Heritage() {
  return (
    <>
      <Seo
        title="Heritage — THE ORIGINAL"
        description="How THE ORIGINAL is set up as a shop for spices and dry fruits. The catalogue is sample stock until the client’s own story and photographs arrive."
      />
      <section className="bg-ivory">
        <PageWidth className="grid items-start gap-10 pt-8 pb-12 lg:grid-cols-2">
          <Reveal from="left">
            <p className="text-[12px] tracking-[0.2em] text-gold uppercase">Heritage</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight font-medium text-navy">
              A name for the pantry, waiting on the family’s own story.
            </h1>
            <p className="mt-5 text-base leading-7 text-mute">
              THE ORIGINAL is the client’s mark. A founding year, a founder’s name and a workshop address have not been supplied, so this page does not invent them. What is here is the shop the mark sits on: spices, dry fruits and nuts, sold by weight.
            </p>
            <p className="mt-4 text-base leading-7 text-mute">
              When the real history arrives, it replaces this draft. The catalogue, the bag and the checkout are already in place.
            </p>
            <Link to="/shop" className={`${btnPrimary} mt-8`}>
              Browse the catalogue
            </Link>
          </Reveal>
          <Reveal from="right">
            <div className="shape-arch aspect-[4/5] overflow-hidden bg-sand shadow-[0_22px_50px_rgba(12,27,51,0.14)]">
              <img
                src="/images/editorial/nuts-bowl.jpg"
                alt="A bowl of mixed nuts"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </PageWidth>
      </section>
      <PageWidth className="py-16">
        <Reveal>
          <p className="text-[12px] tracking-[0.2em] text-gold uppercase">What the shop holds</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl text-navy">Four parts of the same cupboard.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {holdings.map((item, index) => (
            <Reveal key={item.title} from={index % 2 === 0 ? "left" : "right"}>
              <article className="h-full rounded-[1.6rem] bg-ivory px-6 py-6">
                <h2 className="font-serif text-3xl text-navy">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-mute">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </PageWidth>
      <PageWidth className="space-y-20 py-4 pb-16">
        {chapters.map((chapter, index) => (
          <article key={chapter.title} className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal from={index % 2 === 0 ? "left" : "right"} className={index % 2 === 0 ? "" : "lg:order-2"}>
              <div className="shape-pebble aspect-[5/4] overflow-hidden bg-sand">
                <img src={chapter.image} alt={chapter.alt} className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal from={index % 2 === 0 ? "right" : "left"}>
              <p className="text-[12px] tracking-[0.16em] text-gold uppercase">0{index + 1}</p>
              <h2 className="mt-3 font-serif text-4xl text-navy">{chapter.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-mute">{chapter.text}</p>
            </Reveal>
          </article>
        ))}
      </PageWidth>
      <section className="bg-navy text-paper">
        <PageWidth className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl">The story can be replaced. The shop is already open.</h2>
            <p className="mt-3 text-sm leading-7 text-paper/75">
              Weights, the bag and the demonstration checkout work now. A founding year and an address can be written in when they are known.
            </p>
          </div>
          <Link to="/contact" className="border border-gold-line px-5 py-3 text-[12px] tracking-[0.16em] text-gold-line uppercase hover:bg-paper hover:text-navy">
            Write to the house
          </Link>
        </PageWidth>
      </section>
    </>
  );
}
