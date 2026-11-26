import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { NewsletterForm } from "../components/NewsletterForm.tsx";
import { ProductCard } from "../components/ProductCard.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary } from "../components/ui.tsx";
import { products } from "../data/products.ts";

const assurances = [
  { title: "Certified GI Terroirs", text: "Single-origin authentic provenance", icon: "origin" },
  { title: "7-Stage Lab Certified", text: "Zero dyes, fillers, or adulterants", icon: "lab" },
  { title: "Nitrogen Fresh Sealed", text: "Preserving delicate volatile oils", icon: "seal" },
  { title: "Complimentary Express", text: "Free delivery on orders over ₹999", icon: "delivery" },
] as const;

const shelves = [
  {
    no: "01",
    title: "Dry fruits",
    text: "Almonds, cashews, raisins, dates and figs.",
    to: "/shop?category=dry-fruits",
    image: "/images/editorial/nuts-bowl.jpg",
    alt: "A bowl of mixed nuts",
    tall: true,
  },
  {
    no: "02",
    title: "Whole spices",
    text: "Cardamom, cinnamon, cloves, pepper and cumin.",
    to: "/shop?category=spices",
    image: "/images/editorial/market-stall.jpg",
    alt: "Open bins of whole spices at a market stall",
    tall: false,
  },
  {
    no: "03",
    title: "Powders",
    text: "Turmeric, chilli, coriander and garam masala.",
    to: "/shop?category=spices",
    image: "/images/products/turmeric-powder.jpg",
    alt: "A close view of turmeric powder",
    tall: false,
  },
];

const orbit = [
  {
    name: "Turmeric Powder",
    slug: "turmeric-powder",
    image: "/images/products/turmeric-powder.jpg",
    alt: "Close view of turmeric powder",
    shape: "shape-circle",
  },
  {
    name: "Green Cardamom",
    slug: "green-cardamom",
    image: "/images/products/green-cardamom.jpg",
    alt: "Whole green cardamom pods",
    shape: "shape-pebble",
  },
  {
    name: "Almonds",
    slug: "almonds",
    image: "/images/products/almonds.jpg",
    alt: "Whole almonds",
    shape: "shape-circle",
  },
  {
    name: "Dates",
    slug: "dates",
    image: "/images/products/dates.jpg",
    alt: "A pile of dried dates",
    shape: "shape-pebble",
  },
  {
    name: "Pistachios",
    slug: "pistachios",
    image: "/images/products/pistachios.jpg",
    alt: "Pistachios in their shells",
    shape: "shape-pebble",
  },
];

const sizes = [
  { label: "100 g", text: "A first jar. Enough for cardamom, cloves and anything opened only now and then." },
  { label: "250 g", text: "The everyday pack. Turmeric, chilli, almonds and the tin that turns over each week." },
  { label: "500 g", text: "When the same jar is refilled through the month." },
  { label: "1 kg", text: "A kitchen that cooks daily, or a house that shares the cupboard." },
];

const kitchen = [
  {
    title: "For the daily pot",
    text: "Turmeric, chilli and cumin sit in most everyday cooking. Start with 250 g if the jar turns over each week.",
    to: "/shop?category=spices",
    image: "/images/products/turmeric-powder.jpg",
    alt: "Turmeric powder",
  },
  {
    title: "For tea and sweets",
    text: "Green cardamom, cinnamon and cloves are the smaller jars. A 100 g pack is enough until you know the pace.",
    to: "/product/green-cardamom",
    image: "/images/products/cinnamon.jpg",
    alt: "Cinnamon sticks",
  },
  {
    title: "For the tin",
    text: "Almonds, cashews, raisins and dates are the dry-fruit side of the same shop. Weights work the same way.",
    to: "/shop?category=dry-fruits",
    image: "/images/products/dates.jpg",
    alt: "Dried dates",
  },
];

const whySlides = [
  {
    kicker: "Weights",
    title: "The size you pick is the price you pay.",
    text: "100 g, 250 g, 500 g and 1 kg sit on the same page. Gift boxes use Classic, Grand and Reserve. The figure updates before anything goes into the bag.",
    image: "/images/products/green-cardamom.jpg",
    alt: "Whole green cardamom pods",
  },
  {
    kicker: "Plain lists",
    title: "A single spice stays a single spice.",
    text: "Blends and hampers say when the contents are still a sample. If a photograph is only a stand-in, the product page says so.",
    image: "/images/editorial/market-stall.jpg",
    alt: "Open bins of spices and dry fruits at a market stall",
  },
  {
    kicker: "A true checkout",
    title: "The order is recorded. The payment is not.",
    text: "You can place a demonstration order and find it under Profile. No card is charged and no courier is booked.",
    image: "/images/editorial/dried-chillies.jpg",
    alt: "A pile of whole dried red chillies",
  },
];

const testimonials = [
  {
    quote: "I compared 250 g and 500 g on the same page and knew the total before I opened the bag.",
    name: "Meera",
    detail: "Sample quote",
  },
  {
    quote: "Cardamom and dates were easy to find. The page stayed quiet, which is what I wanted.",
    name: "Arjun",
    detail: "Sample quote",
  },
  {
    quote: "The spice list is plain. I could see what a single ingredient was, and what a blend still needed confirmed.",
    name: "Fatima",
    detail: "Sample quote",
  },
];

const homeFaq = [
  {
    q: "How does the weight change the price?",
    a: "Choose 100 g, 250 g, 500 g or 1 kg on the product page. The price is for that size, then multiplied by the quantity.",
  },
  {
    q: "Does the bag stay if I refresh?",
    a: "Yes. The bag, wishlist and any order you place are stored in this browser.",
  },
  {
    q: "What does delivery cost?",
    a: "Delivery is ₹79. It becomes free once the goods, after any discount, reach ₹999.",
  },
  {
    q: "Will checkout charge me?",
    a: "No. The payment choices are labels only. Nothing is sent to a bank.",
  },
];

function usePointerTilt(max = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    reduced.current = motion.matches || !fine.matches;
  }, []);

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced.current || event.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    setTransform(`rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`);
  }

  function onPointerLeave() {
    setTransform("rotateX(0deg) rotateY(0deg)");
  }

  return { ref, transform, onPointerMove, onPointerLeave };
}

function AssuranceIcon({ name }: { name: (typeof assurances)[number]["icon"] }) {
  const pen = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {name === "origin" ? (
        <>
          <path {...pen} d="M4 16.5 8.2 10l3.1 3.4L15.2 8 20 16.5" />
          <path {...pen} d="M4 19h16" />
        </>
      ) : null}
      {name === "lab" ? (
        <>
          <path {...pen} d="M9 3h6" />
          <path {...pen} d="M10 3v5.5L6.8 17.2A2.8 2.8 0 0 0 9.3 21h5.4a2.8 2.8 0 0 0 2.5-3.8L14 8.5V3" />
          <path {...pen} d="M8.6 14h6.8" />
        </>
      ) : null}
      {name === "seal" ? (
        <>
          <path {...pen} d="M9 5h6v3H9z" />
          <path {...pen} d="M8 8h8v10.2a1.8 1.8 0 0 1-1.8 1.8H9.8A1.8 1.8 0 0 1 8 18.2V8z" />
          <path {...pen} d="M10.5 12.5h3" />
        </>
      ) : null}
      {name === "delivery" ? (
        <>
          <path {...pen} d="M3.5 8.2 12 4.5l8.5 3.7L12 12z" />
          <path {...pen} d="M3.5 8.2V16l8.5 3.7L20.5 16V8.2" />
          <path {...pen} d="M12 12v7.7" />
        </>
      ) : null}
    </svg>
  );
}

export default function Home() {
  const featured = products.filter((product) => product.bestseller && !product.categories.includes("gifts")).slice(0, 4);
  const dryFruits = products.filter((product) => product.categories.includes("dry-fruits"));

  return (
    <>
      <Seo
        title="THE ORIGINAL — Spices and dry fruits"
        description="Shop spices, dry fruits, nuts, seeds and gift boxes from THE ORIGINAL. Choose a weight, review the bag and place a sample order."
      />

      <section
        className="home-hero home-hero-lead relative isolate w-full bg-navy"
        style={{ "--hero": "url(/images/editorial/hero-premium.jpg)" } as CSSProperties}
      >
        <div className="hero-frame">
          <img
            src="/images/editorial/hero-premium.jpg"
            alt="Antique spoon of green cardamom with cinnamon, star anise, pistachios, almonds and turmeric on dark slate"
            className="hero-breathe"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,27,51,0.92)_0%,rgba(12,27,51,0.78)_38%,rgba(12,27,51,0.2)_64%,transparent_80%)]" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
          <div className="max-w-[16rem] text-paper sm:max-w-md lg:max-w-lg [text-shadow:0_1px_2px_rgba(8,16,32,0.75),0_10px_28px_rgba(8,16,32,0.45)]">
            <p className="text-sm font-semibold">Spices and dry fruits</p>
            <h1 className="mt-2 font-serif text-5xl font-semibold leading-[1.02] sm:mt-3 sm:text-6xl">
              Sold by weight. Priced on the page.
            </h1>
            <p className="hero-copy mt-3 max-w-[14rem] text-lg font-medium leading-7 sm:max-w-md">
              100 g up to 1 kg. The figure you see is the figure that goes in the bag.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-8">
              <Link to="/shop" className={`${btnPrimary} border border-paper/40`}>
                Shop the catalogue
              </Link>
              <Link to="/heritage" className="inline-flex items-center px-2 py-3 text-sm font-semibold text-paper">
                Heritage
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory">
        <PageWidth className="grid gap-3 pt-8 pb-6 sm:grid-cols-2 sm:pt-12 sm:pb-8 lg:grid-cols-4">
          {assurances.map((item) => (
            <article key={item.title} className="flex items-start gap-3 rounded-xl border border-line bg-paper px-4 py-3.5">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-line/60 text-gold">
                <AssuranceIcon name={item.icon} />
              </span>
              <span>
                <p className="font-serif text-lg leading-tight text-navy sm:text-xl">{item.title}</p>
                <p className="mt-1 text-sm leading-5 text-mute">{item.text}</p>
              </span>
            </article>
          ))}
        </PageWidth>
      </section>

      <PageWidth className="py-16 sm:py-20">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-sm font-semibold text-gold">The cupboard</p>
            <h2 className="mt-2 font-serif text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl">
              Three shelves.
              <br />
              One shop.
            </h2>
          </div>
          <div className="lg:pb-2 lg:text-right">
            <p className="text-base font-medium leading-7 text-ink">
              Dry fruits for the tin, whole spices for the jar, powders for the pot you cook every day.
            </p>
            <Link to="/shop" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold">
              See the full shop
            </Link>
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
          {shelves.map((shelf, index) => (
            <Reveal
              key={shelf.no}
              from={shelf.tall ? "left" : "right"}
              delay={shelf.tall ? 0 : index * 110}
              className={`shelf-in h-full ${shelf.tall ? "lg:row-span-2" : ""}`}
            >
              <Link
                to={shelf.to}
                className={`group relative flex h-full min-h-[240px] overflow-hidden rounded-2xl ${shelf.tall ? "lg:min-h-[520px]" : ""}`}
              >
                <img src={shelf.image} alt={shelf.alt} className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
                <span className="relative flex h-full min-h-[240px] flex-col justify-end p-6 text-paper lg:min-h-0">
                  <span className="text-sm font-semibold text-paper/80">{shelf.no}</span>
                  <span className="mt-1 font-serif text-4xl font-semibold">{shelf.title}</span>
                  <span className="mt-2 max-w-sm text-sm font-medium leading-6 text-paper/90">{shelf.text}</span>
                  <span className="mt-3 text-sm font-semibold">Open this shelf</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </PageWidth>

      <WhyReel />

      <PageWidth className="py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] tracking-[0.2em] uppercase text-gold">A closer look</p>
            <h2 className="mt-3 font-serif text-4xl font-medium text-navy">Lift a picture. It turns toward you.</h2>
          </div>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible">
          {orbit.map((item) => (
            <OrbitCard key={item.slug} item={item} />
          ))}
        </div>
      </PageWidth>

      <section className="bg-ivory py-16">
        <PageWidth>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gold">The tin</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-navy">Our dry fruits.</h2>
            </div>
            <Link to="/shop?category=dry-fruits" className="text-sm font-semibold text-navy">
              All dry fruits
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {dryFruits.map((product, index) => (
              <Reveal key={product.id} from={index % 2 === 0 ? "left" : "right"} delay={(index % 4) * 70}>
                <ProductCard product={product} surface="var(--color-ivory)" />
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <section className="border-y border-line bg-paper">
        <PageWidth className="py-16">
          <Reveal>
            <p className="text-[12px] tracking-[0.2em] text-gold uppercase">A size for the pace</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-medium text-navy">Pick the jar by how often it opens.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((size, index) => (
              <Reveal key={size.label} from={index < 2 ? "left" : "right"} delay={index * 70}>
                <article className="h-full rounded-[1.6rem] bg-ivory px-5 py-6">
                  <p className="font-serif text-4xl text-navy">{size.label}</p>
                  <p className="mt-3 text-sm leading-6 text-mute">{size.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <PageWidth className="grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal from="left">
        <div className="shape-pebble aspect-[5/4] overflow-hidden bg-sand shadow-[0_18px_40px_rgba(12,27,51,0.1)]">
          <img
            src="/images/editorial/market-stall.jpg"
            alt="Open bins of cardamom, star anise, peppercorns, cloves and raisins at a spice stall"
            className="h-full w-full object-cover"
          />
        </div>
        </Reveal>
        <Reveal from="right">
        <div>
          <p className="text-[12px] tracking-[0.2em] uppercase text-gold">How an order moves</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight font-medium text-navy sm:text-5xl">
            From the picture to a recorded order.
          </h2>
          <ol className="mt-8 space-y-5">
            <li>
              <p className="font-serif text-2xl text-navy">01 — Choose a weight</p>
              <p className="mt-1 text-sm leading-6 text-mute">The price on the product page is for the size you select, then multiplied by quantity.</p>
            </li>
            <li>
              <p className="font-serif text-2xl text-navy">02 — Keep the bag</p>
              <p className="mt-1 text-sm leading-6 text-mute">The cart stays in this browser. Delivery is ₹79, and it drops away at ₹999.</p>
            </li>
            <li>
              <p className="font-serif text-2xl text-navy">03 — Place a demonstration order</p>
              <p className="mt-1 text-sm leading-6 text-mute">Checkout records the order here. It does not take a payment or book a courier.</p>
            </li>
          </ol>
        </div>
        </Reveal>
      </PageWidth>

      <section className="border-y border-line bg-ivory py-20">
        <PageWidth>
          <p className="text-[12px] tracking-[0.2em] uppercase text-gold">In the kitchen</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-medium text-navy">Where each jar actually goes.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {kitchen.map((item, index) => (
              <Reveal key={item.title} from={index === 0 ? "left" : index === 2 ? "right" : "up"} delay={index * 80}>
              <Link to={item.to} className="group block">
                <span className="shape-arch block aspect-[4/5] overflow-hidden bg-sand">
                  <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
                </span>
                <h3 className="mt-4 font-serif text-3xl text-navy group-hover:text-gold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mute">{item.text}</p>
              </Link>
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <section className="bg-ivory py-20">
        <PageWidth>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gold">Best sellers</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-navy">The packs that go first.</h2>
            </div>
            <Link to="/shop?sort=featured" className="text-sm font-semibold text-navy">
              All products
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} from={index % 2 === 0 ? "left" : "right"} delay={(index % 4) * 80}>
                <ProductCard product={product} surface="var(--color-ivory)" />
              </Reveal>
            ))}
          </div>
        </PageWidth>
      </section>

      <TestimonialReel />

      <section className="bg-paper pb-4">
        <PageWidth className="pb-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] tracking-[0.2em] uppercase text-gold">FAQ</p>
              <h2 className="mt-3 font-serif text-4xl font-medium text-navy">Before you check out.</h2>
            </div>
            <Link to="/faq" className="text-[12px] tracking-[0.16em] uppercase text-navy">
              All questions
            </Link>
          </div>
          <HomeFaq />
        </PageWidth>
      </section>

      <section className="bg-sand">
        <PageWidth className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="font-serif text-4xl text-navy">A short note, when there is news.</h2>
            <p className="mt-2 text-sm leading-6 text-mute">
              Leave an email. It stays in this browser until a mailing service is connected.
            </p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm id="home-email" />
          </div>
        </PageWidth>
      </section>
    </>
  );
}

function useSlide(length: number, ms: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [paused, length, ms]);

  return {
    index,
    setPaused,
    go(step: number) {
      setIndex((value) => (value + step + length) % length);
    },
    select(next: number) {
      setIndex(next);
    },
  };
}

function WhyReel() {
  const slide = useSlide(whySlides.length, 6200);
  const current = whySlides[slide.index];

  return (
    <section
      className="overflow-hidden bg-navy text-paper"
      onMouseEnter={() => slide.setPaused(true)}
      onMouseLeave={() => slide.setPaused(false)}
    >
      <PageWidth className="grid items-center gap-10 py-14 lg:grid-cols-2">
        <Reveal from="left">
          <div className="shape-arch relative aspect-[4/5] max-h-[520px] overflow-hidden bg-navy-soft shadow-[0_24px_50px_rgba(0,0,0,0.25)]">
            <img key={current.image} src={current.image} alt={current.alt} className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal from="right">
          <p className="text-[12px] tracking-[0.2em] text-gold-line uppercase">Why us</p>
          <p className="mt-5 text-[12px] tracking-[0.16em] text-paper/55 uppercase">{current.kicker}</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{current.title}</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-paper/75">{current.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold-line text-lg text-gold-line"
              aria-label="Previous reason"
              onClick={() => slide.go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold-line text-lg text-gold-line"
              aria-label="Next reason"
              onClick={() => slide.go(1)}
            >
              ›
            </button>
            <div className="flex gap-2">
              {whySlides.map((item, index) => (
                <button
                  key={item.kicker}
                  type="button"
                  aria-label={`Show ${item.kicker}`}
                  aria-current={index === slide.index ? "true" : undefined}
                  className={`h-2.5 rounded-full ${index === slide.index ? "w-7 bg-gold-line" : "w-2.5 bg-paper/35"}`}
                  onClick={() => slide.select(index)}
                />
              ))}
            </div>
            <Link
              to="/why-us"
              className="ml-auto border border-gold-line px-5 py-3 text-[12px] tracking-[0.16em] text-gold-line uppercase hover:bg-paper hover:text-navy"
            >
              Read why us
            </Link>
          </div>
        </Reveal>
      </PageWidth>
    </section>
  );
}

function TestimonialReel() {
  const slide = useSlide(testimonials.length, 5400);
  const note = testimonials[slide.index];

  return (
    <PageWidth className="py-20">
      <div className="max-w-xl">
        <p className="text-[12px] tracking-[0.2em] text-gold uppercase">Testimonials</p>
        <h2 className="mt-3 font-serif text-4xl font-medium text-navy">What shoppers notice first.</h2>
        <p className="mt-3 text-sm leading-6 text-mute">
          Sample quotes for the layout. Replace them with real reviews when you have them.
        </p>
      </div>
      <div
        className="mt-10"
        onMouseEnter={() => slide.setPaused(true)}
        onMouseLeave={() => slide.setPaused(false)}
      >
        <blockquote key={note.name} className="rounded-[1.8rem] bg-ivory px-8 py-10 sm:px-12">
          <p className="max-w-3xl font-serif text-3xl leading-snug text-navy sm:text-4xl">“{note.quote}”</p>
          <footer className="mt-8 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-serif text-lg text-paper">
              {note.name.slice(0, 1)}
            </span>
            <span>
              <span className="block text-sm text-navy">{note.name}</span>
              <span className="block text-xs tracking-[0.12em] text-mute uppercase">{note.detail}</span>
            </span>
          </footer>
        </blockquote>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-navy text-lg text-navy"
            aria-label="Previous quote"
            onClick={() => slide.go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-navy text-lg text-navy"
            aria-label="Next quote"
            onClick={() => slide.go(1)}
          >
            ›
          </button>
          <div className="flex gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show quote from ${item.name}`}
                aria-current={index === slide.index ? "true" : undefined}
                className={`h-2.5 rounded-full ${index === slide.index ? "w-7 bg-navy" : "w-2.5 bg-line"}`}
                onClick={() => slide.select(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWidth>
  );
}

function HomeFaq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-8 divide-y divide-line border-y border-line">
      {homeFaq.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-serif text-2xl text-navy"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.q}
                <span aria-hidden="true" className="text-base text-mute">{expanded ? "–" : "+"}</span>
              </button>
            </h3>
            {expanded ? <p className="max-w-3xl pb-5 text-sm leading-7 text-mute">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function OrbitCard({ item }: { item: (typeof orbit)[number] }) {
  const tilt = usePointerTilt(14);
  return (
    <Link
      to={`/product/${item.slug}`}
      className="hero-stage block w-[42vw] shrink-0 snap-start text-center sm:w-[28vw] md:w-auto"
    >
      <span
        ref={tilt.ref}
        className="block"
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
      >
        <span className="hero-tilt block" style={{ transform: tilt.transform }}>
          <img
            src={item.image}
            alt={item.alt}
            className={`${item.shape} mx-auto aspect-square w-[86%] object-cover shadow-[0_16px_32px_rgba(12,27,51,0.14)]`}
          />
        </span>
      </span>
      <span className="mt-3 block font-serif text-sm text-navy sm:text-2xl">{item.name}</span>
    </Link>
  );
}
