import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils.ts";

/**
 * NotchedProjectCard
 *
 * A project card whose cover has a rounded notch bitten out of its
 * bottom-right corner, with the "open" arrow nested inside it. The cut is
 * concentric with the arrow disc, and filleted where it meets the cover's
 * edges, so the cover curves into it instead of ending on a point.
 *
 * The notch is drawn by three layers painted in the colour of the surface
 * BEHIND the card (`surface`, the page background by default). Put the card
 * on a different background and pass that colour, or the notch shows.
 */

export interface NotchedProjectCardProps {
  href: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  tags?: string[];
  screen?: { src: string; alt: string; className?: string };
  dim?: number;
  monochrome?: boolean;
  surface?: string;
  accent?: string;
  accentForeground?: string;
  className?: string;
}

const DISC = 64;
const BLOCK = 80;
const FILLET = 28;

export function NotchedProjectCard({
  href,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  tags = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = false,
  surface = "var(--color-background)",
  accent,
  accentForeground = "#0a0a0a",
  className,
}: NotchedProjectCardProps) {
  const tone = monochrome
    ? "grayscale transition-[filter,scale] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
    : "transition-[scale] duration-500";
  const internal = href.startsWith("/");
  const classNames = cn(
    "group flex flex-col rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    className,
  );

  const body = (
    <>
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-muted">
          <img
            src={image}
            alt={screen ? "" : imageAlt}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              tone,
              !screen && "group-hover:scale-[1.04]",
            )}
          />
          {dim > 0 ? (
            <div aria-hidden className="absolute inset-0" style={{ backgroundColor: `rgb(0 0 0 / ${dim})` }} />
          ) : null}
          {screen ? (
            <img
              src={screen.src}
              alt={screen.alt}
              className={cn(
                "absolute right-0 bottom-0 w-[82%] origin-bottom-right drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.07]",
                tone,
                screen.className,
              )}
            />
          ) : null}
          {badge ? (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {badge}
              </span>
            </div>
          ) : null}
        </div>

        <div
          aria-hidden
          className="absolute right-0 bottom-0"
          style={{ width: BLOCK, height: BLOCK, borderTopLeftRadius: BLOCK - DISC / 2, background: surface }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        <span
          aria-hidden
          className={cn(
            "absolute right-0 bottom-0 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-[background-color,color,scale] duration-300 group-hover:scale-105",
            accent
              ? "group-hover:bg-[var(--card-accent)] group-hover:text-[var(--card-accent-fg)]"
              : "group-hover:bg-primary group-hover:text-primary-foreground",
          )}
          style={
            {
              width: DISC,
              height: DISC,
              "--card-accent": accent,
              "--card-accent-fg": accentForeground,
            } as CSSProperties
          }
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <h3 className="mt-5 font-serif text-2xl font-medium tracking-tight text-foreground">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
      {tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <li
              key={`${t}-${i}`}
              className="rounded-md bg-secondary px-2 py-1 text-[10px] font-semibold tracking-wider text-secondary-foreground uppercase"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  if (internal) {
    return (
      <Link to={href} className={classNames}>
        {body}
      </Link>
    );
  }

  return (
    <a href={href} className={classNames}>
      {body}
    </a>
  );
}

export default NotchedProjectCard;
