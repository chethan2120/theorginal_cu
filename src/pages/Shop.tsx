import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IconClose } from "../components/Icons.tsx";
import { ProductCard } from "../components/ProductCard.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, fieldClass } from "../components/ui.tsx";
import { categories, categoryCount, filterProducts, lowestPrice } from "../data/products.ts";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "name", label: "Name" },
];

const bands = [
  { id: "any", label: "Any price" },
  { id: "under-200", label: "Under ₹200" },
  { id: "200-500", label: "₹200 – ₹500" },
  { id: "500-1000", label: "₹500 – ₹1,000" },
  { id: "over-1000", label: "Over ₹1,000" },
];

const wholeSpiceSlugs = new Set(["black-pepper", "green-cardamom", "cinnamon", "cloves", "cumin-seeds"]);
const powderSpiceSlugs = new Set(["turmeric-powder", "red-chilli-powder", "coriander-powder", "garam-masala"]);

const catalogue = [
  {
    id: "dry-fruits",
    title: "Dry fruits",
    text: "Almonds, cashews, dates and figs.",
    image: "/images/products/almonds.jpg",
    alt: "Whole almonds",
    position: "center 78%",
  },
  {
    id: "whole",
    title: "Dry spices",
    text: "Cardamom, pepper, cinnamon and cloves.",
    image: "/images/products/green-cardamom.jpg",
    alt: "Whole green cardamom pods",
    position: "center",
  },
  {
    id: "powder",
    title: "Powder spices",
    text: "Turmeric, chilli, coriander and garam masala.",
    image: "/images/products/turmeric-powder.jpg",
    alt: "Turmeric powder",
    position: "center",
  },
];

function inBand(price: number, band: string) {
  if (band === "under-200") return price < 200;
  if (band === "200-500") return price >= 200 && price <= 500;
  if (band === "500-1000") return price > 500 && price <= 1000;
  if (band === "over-1000") return price > 1000;
  return true;
}

function FilterFields({
  idPrefix,
  category,
  query,
  sort,
  band,
  showSort,
  onChange,
}: {
  idPrefix: string;
  category: string;
  query: string;
  sort: string;
  band: string;
  showSort: boolean;
  onChange: (next: Record<string, string>) => void;
}) {
  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-search`} className="text-[12px] tracking-[0.14em] uppercase text-mute">
          Search
        </label>
        <input
          id={`${idPrefix}-search`}
          value={query}
          onChange={(event) => onChange({ q: event.target.value })}
          placeholder="Name or ingredient"
          className={`${fieldClass} mt-2`}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-[12px] tracking-[0.14em] uppercase text-mute">Category</legend>
        <div className="mt-3 space-y-1">
          {categories.map((item) => {
            const selected = item.id === category;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                className={`flex w-full items-center justify-between rounded-full px-3 py-2.5 text-left text-sm ${
                  selected ? "bg-navy text-paper" : "text-navy hover:bg-paper"
                }`}
                onClick={() => onChange({ category: item.id })}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-70">{categoryCount(item.id)}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {showSort ? (
        <div className="mt-6">
          <label htmlFor={`${idPrefix}-sort`} className="text-[12px] tracking-[0.14em] uppercase text-mute">
            Sort
          </label>
          <select
            id={`${idPrefix}-sort`}
            value={sort}
            onChange={(event) => onChange({ sort: event.target.value })}
            className={`${fieldClass} mt-2`}
          >
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <fieldset className="mt-6">
        <legend className="text-[12px] tracking-[0.14em] uppercase text-mute">Price</legend>
        <div className="mt-3 space-y-1">
          {bands.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
              <input
                type="radio"
                name={`${idPrefix}-price`}
                checked={band === item.id}
                onChange={() => onChange({ band: item.id })}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sheet, setSheet] = useState<null | "sort" | "filter">(null);
  const category = params.get("category") ?? "all";
  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "featured";
  const band = params.get("band") ?? "any";
  const shelf = params.get("shelf") ?? "";
  const scopedCategory =
    shelf === "dry-fruits" ? "dry-fruits" : shelf === "whole" || shelf === "powder" ? "spices" : category;

  const list = useMemo(() => {
    return filterProducts({ category: scopedCategory, query, sort }).filter((product) => {
      if (!inBand(lowestPrice(product), band)) return false;
      if (shelf === "whole") return wholeSpiceSlugs.has(product.slug);
      if (shelf === "powder") return powderSpiceSlugs.has(product.slug);
      return true;
    });
  }, [scopedCategory, query, sort, band, shelf]);

  const current = categories.find((item) => item.id === category) ?? categories[0];
  const activeShelf = catalogue.find((item) => item.id === shelf);

  function update(next: Record<string, string>) {
    const following = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (
        !value ||
        value === "all" ||
        value === "any" ||
        (key === "sort" && value === "featured") ||
        (key === "q" && value === "")
      ) {
        following.delete(key);
      } else {
        following.set(key, value);
      }
    });
    if ("shelf" in next) following.delete("category");
    if ("category" in next) following.delete("shelf");
    setParams(following);
  }

  const filtersActive = category !== "all" || query !== "" || sort !== "featured" || band !== "any" || shelf !== "";
  const filterCount = Number(category !== "all") + Number(query !== "") + Number(band !== "any") + Number(shelf !== "");
  const sortLabel = sorts.find((item) => item.id === sort)?.label ?? "Featured";
  const bandLabel = bands.find((item) => item.id === band)?.label ?? "Any price";

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSheet(null);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const heading = activeShelf?.title ?? current.label;
  const blurb = activeShelf ? activeShelf.text : `${current.blurb} Prices and photographs are samples.`;

  return (
    <>
    <Seo
      title={`${heading} — THE ORIGINAL`}
      description={`Browse ${heading.toLowerCase()} from THE ORIGINAL. Filter by category, search, and sort by price.`}
    />
    <section className="border-b border-line bg-ivory">
      <PageWidth className="py-7 sm:py-9">
        <p className="text-[12px] tracking-[0.2em] uppercase text-gold">The catalogue</p>
        <div className="mt-2 flex items-end justify-between gap-6">
          <h1 className="font-serif text-4xl font-medium text-navy sm:text-5xl">Three shelves.</h1>
          <p className="hidden max-w-xs text-sm leading-6 text-mute md:block">
            Dry fruits, dry spices and powder spices. Choose a shelf, then a weight.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          {catalogue.map((item) => {
            const selected = shelf === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => update({ shelf: selected ? "" : item.id })}
                className="group text-left"
              >
                <span
                  className={`relative block overflow-hidden rounded-2xl bg-navy ${
                    selected ? "ring-2 ring-gold-line ring-offset-2 ring-offset-ivory" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-36 w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] sm:h-44 lg:h-52"
                    style={{ objectPosition: item.position }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                    <span className="block font-serif text-[15px] leading-tight text-paper sm:text-2xl">{item.title}</span>
                    <span className="mt-1 hidden text-xs leading-5 text-paper/80 sm:block">{item.text}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </PageWidth>
    </section>
    <PageWidth className="pt-8 pb-24 lg:pb-12">
      <h2 className="font-serif text-3xl font-medium text-navy sm:text-4xl">{heading}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{blurb}</p>

      <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden rounded-[1.4rem] border border-line bg-ivory p-5 lg:sticky lg:top-24 lg:block">
          <h2 className="font-serif text-2xl text-navy">Filters</h2>
          <div className="mt-5">
            <FilterFields
              idPrefix="desk"
              category={shelf ? "" : category}
              query={query}
              sort={sort}
              band={band}
              showSort
              onChange={update}
            />
          </div>
          {filtersActive ? (
            <button
              type="button"
              className="mt-6 text-[12px] tracking-[0.14em] uppercase text-navy underline"
              onClick={() => setParams(new URLSearchParams())}
            >
              Clear filters
            </button>
          ) : null}
        </aside>

        <div>
          <div className="flex flex-wrap gap-2 lg:hidden">
            {activeShelf ? (
              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-navy" onClick={() => update({ shelf: "" })}>
                {activeShelf.title}
                <IconClose className="h-3.5 w-3.5" />
                <span className="sr-only">Remove shelf</span>
              </button>
            ) : null}
            {category !== "all" ? (
              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-navy" onClick={() => update({ category: "all" })}>
                {current.label}
                <IconClose className="h-3.5 w-3.5" />
                <span className="sr-only">Remove category</span>
              </button>
            ) : null}
            {band !== "any" ? (
              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-navy" onClick={() => update({ band: "any" })}>
                {bandLabel}
                <IconClose className="h-3.5 w-3.5" />
                <span className="sr-only">Remove price</span>
              </button>
            ) : null}
            {query ? (
              <button type="button" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1.5 text-sm text-navy" onClick={() => update({ q: "" })}>
                {query}
                <IconClose className="h-3.5 w-3.5" />
                <span className="sr-only">Remove search</span>
              </button>
            ) : null}
          </div>
          <p className={`text-sm text-mute ${filtersActive ? "mt-3 lg:mt-0" : ""}`} aria-live="polite">
            {list.length} {list.length === 1 ? "product" : "products"}
          </p>

          {list.length === 0 ? (
            <div className="mt-6 rounded-[1.4rem] border border-line bg-ivory px-6 py-12 text-center">
              <h2 className="font-serif text-3xl text-navy">Nothing matches.</h2>
              <p className="mt-2 text-sm text-mute">Try another word, or clear the filters.</p>
              <button
                type="button"
                className="mt-6 border border-navy px-4 py-2 text-[12px] tracking-[0.14em] uppercase"
                onClick={() => setParams(new URLSearchParams())}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((product, index) => (
                <Reveal key={product.id} from={index % 2 === 0 ? "left" : "right"} delay={(index % 3) * 70}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper lg:hidden">
        <div className="grid grid-cols-2">
          <button
            type="button"
            className="flex min-h-16 items-center justify-center border-r border-line px-2 text-sm font-semibold text-navy"
            onClick={() => setSheet("sort")}
          >
            <span className="flex flex-col items-center leading-none">
              <span className="flex items-center gap-2">
                <SortMark />
                Sort
              </span>
              <span className="mt-1 max-w-[9rem] truncate text-[11px] font-medium text-mute">{sortLabel}</span>
            </span>
          </button>
          <button
            type="button"
            className="flex min-h-16 items-center justify-center gap-2 text-sm font-semibold text-navy"
            onClick={() => setSheet("filter")}
          >
            <FilterMark />
            Filter
            {filterCount > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-navy px-1 text-[11px] text-paper">
                {filterCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {sheet ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-navy/45" aria-label="Close" onClick={() => setSheet(null)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={sheet === "sort" ? "Sort" : "Filters"}
            className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-3xl bg-paper px-5 pt-3 pb-6 shadow-[0_-12px_40px_rgba(8,16,32,0.18)]"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" />
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-navy">{sheet === "sort" ? "Sort by" : "Filters"}</h2>
              <button type="button" className="grid h-10 w-10 place-items-center text-navy" aria-label="Close" onClick={() => setSheet(null)}>
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            {sheet === "sort" ? (
              <div className="mt-2">
                {sorts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={sort === item.id}
                    className="flex w-full items-center justify-between border-b border-line py-3.5 text-left text-sm text-navy"
                    onClick={() => {
                      update({ sort: item.id });
                      setSheet(null);
                    }}
                  >
                    <span>{item.label}</span>
                    <span className={`h-4 w-4 rounded-full border ${sort === item.id ? "border-navy bg-navy shadow-[inset_0_0_0_3px_#fbf9f5]" : "border-line"}`} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <FilterFields
                  idPrefix="phone"
                  category={shelf ? "" : category}
                  query={query}
                  sort={sort}
                  band={band}
                  showSort={false}
                  onChange={update}
                />
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="h-12 border border-navy text-[12px] tracking-[0.14em] uppercase text-navy disabled:opacity-40"
                    disabled={!filtersActive}
                    onClick={() => setParams(new URLSearchParams())}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="h-12 bg-navy text-[12px] tracking-[0.14em] uppercase text-paper"
                    onClick={() => setSheet(null)}
                  >
                    Show {list.length}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </PageWidth>
    </>
  );
}

function SortMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M7 6v12M7 18l-2.5-2.5M7 18l2.5-2.5M17 18V6M17 6l-2.5 2.5M17 6l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </svg>
  );
}
