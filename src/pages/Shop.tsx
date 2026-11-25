import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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

function inBand(price: number, band: string) {
  if (band === "under-200") return price < 200;
  if (band === "200-500") return price >= 200 && price <= 500;
  if (band === "500-1000") return price > 500 && price <= 1000;
  if (band === "over-1000") return price > 1000;
  return true;
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "featured";
  const band = params.get("band") ?? "any";

  const list = useMemo(() => {
    return filterProducts({ category, query, sort }).filter((product) =>
      inBand(lowestPrice(product), band),
    );
  }, [category, query, sort, band]);

  const current = categories.find((item) => item.id === category) ?? categories[0];

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
    setParams(following);
  }

  const filtersActive = category !== "all" || query !== "" || sort !== "featured" || band !== "any";

  return (
    <PageWidth className="py-12">
      <Seo
        title={`${current.label} — THE ORIGINAL`}
        description={`Browse ${current.label.toLowerCase()} from THE ORIGINAL. Filter by category, search, and sort by price.`}
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">The catalogue</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">{current.label}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        {current.blurb} Prices and photographs are samples.
      </p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="rounded-[1.4rem] border border-line bg-ivory p-5 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl text-navy">Filters</h2>

          <div className="mt-5">
            <label htmlFor="shop-search" className="text-[12px] tracking-[0.14em] uppercase text-mute">
              Search
            </label>
            <input
              id="shop-search"
              value={query}
              onChange={(event) => update({ q: event.target.value })}
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
                    className={`flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-sm ${
                      selected ? "bg-navy text-paper" : "text-navy hover:bg-paper"
                    }`}
                    onClick={() => update({ category: item.id })}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70">{categoryCount(item.id)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6">
            <label htmlFor="shop-sort" className="text-[12px] tracking-[0.14em] uppercase text-mute">
              Sort
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) => update({ sort: event.target.value })}
              className={`${fieldClass} mt-2`}
            >
              {sorts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="mt-6">
            <legend className="text-[12px] tracking-[0.14em] uppercase text-mute">Price</legend>
            <div className="mt-3 space-y-1">
              {bands.map((item) => (
                <label key={item.id} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
                  <input
                    type="radio"
                    name="price-band"
                    checked={band === item.id}
                    onChange={() => update({ band: item.id })}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>

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
          <p className="text-sm text-mute" aria-live="polite">
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
    </PageWidth>
  );
}
