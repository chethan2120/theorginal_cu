import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

export function PageWidth({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`grid place-items-center bg-sand px-4 text-center text-sm text-mute ${className}`}>
        Image unavailable
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-line bg-paper">
      <button
        type="button"
        className="h-10 w-10 text-lg text-navy disabled:text-line"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="h-10 w-10 text-lg text-navy disabled:text-line"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-mute">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to} className="hover:text-navy">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const fieldClass =
  "w-full border border-line bg-paper px-3 py-3 text-[15px] text-ink outline-none transition-colors focus:border-navy";

export const labelClass =
  "mb-1.5 block text-[12px] tracking-[0.14em] uppercase text-mute";

export const btnPrimary =
  "inline-flex items-center justify-center bg-navy px-6 py-3.5 text-[12px] font-medium tracking-[0.16em] uppercase text-paper transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-50";

export const btnGhost =
  "inline-flex items-center justify-center border border-navy bg-transparent px-6 py-3.5 text-[12px] font-medium tracking-[0.16em] uppercase text-navy transition-colors hover:bg-navy hover:text-paper disabled:cursor-not-allowed disabled:opacity-50";
