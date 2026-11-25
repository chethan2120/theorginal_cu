import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.tsx";
import { useWishlist } from "../context/WishlistContext.tsx";
import { IconBag, IconClose, IconHeart, IconMenu, IconUser } from "./Icons.tsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Heritage", to: "/heritage" },
  { label: "Contact Us", to: "/contact" },
];

function linkClass(active: boolean) {
  return `text-[12px] tracking-[0.16em] uppercase transition-colors ${
    active ? "text-navy" : "text-mute hover:text-navy"
  }`;
}

export function Header() {
  const { summary } = useCart();
  const wishlist = useWishlist();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  function isActive(to: string) {
    if (to === "/") return location.pathname === "/";
    if (to === "/shop") return location.pathname === "/shop" || location.pathname.startsWith("/product");
    return location.pathname === to;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="h-[3px] bg-navy" />
      <div className="relative mx-auto flex h-[78px] w-full max-w-[1180px] items-center px-5 sm:px-8">
        <Link
          to="/"
          className="z-10 flex shrink-0 items-center gap-3"
          aria-label="THE ORIGINAL home"
          onClick={(event) => {
            if (location.pathname === "/") event.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }}
        >
          <img
            src="/brand/logo.jpg"
            alt=""
            width={58}
            height={58}
            className="h-[58px] w-[58px] object-cover"
          />
          <span className="hidden font-serif text-[1.15rem] tracking-[0.22em] text-navy xl:block">
            THE ORIGINAL
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass(isActive(link.to))}
              aria-current={isActive(link.to) ? "page" : undefined}
              onClick={() => {
                if (link.to === "/" && location.pathname === "/") {
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/account"
            className="grid h-12 w-12 place-items-center text-navy"
            aria-label="Profile"
            aria-current={location.pathname === "/account" ? "page" : undefined}
          >
            <IconUser className="h-8 w-8" />
          </Link>
          <Link
            to="/wishlist"
            className="relative grid h-12 w-12 place-items-center text-navy"
            aria-label={`Wishlist, ${wishlist.ids.length} saved`}
            aria-current={location.pathname === "/wishlist" ? "page" : undefined}
          >
            <IconHeart className="h-8 w-8" />
            {wishlist.ids.length > 0 ? (
              <span className="absolute top-1 right-0 min-w-4 rounded-full bg-navy px-1 text-center text-[10px] leading-4 text-paper">
                {wishlist.ids.length}
              </span>
            ) : null}
          </Link>
          <Link
            to="/cart"
            className="relative grid h-12 w-12 place-items-center text-navy"
            aria-label={`Cart, ${summary.count} items`}
            aria-current={location.pathname === "/cart" ? "page" : undefined}
          >
            <IconBag className="h-8 w-8" />
            {summary.count > 0 ? (
              <span className="absolute top-1 right-0 min-w-4 rounded-full bg-navy px-1 text-center text-[10px] leading-4 text-paper">
                {summary.count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-navy lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line bg-paper px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block border-b border-line py-3 text-[13px] tracking-[0.16em] uppercase text-navy"
                  onClick={() => {
                    if (link.to === "/" && location.pathname === "/") {
                      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/account" className="block border-b border-line py-3 text-[13px] tracking-[0.16em] text-navy uppercase">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="block border-b border-line py-3 text-[13px] tracking-[0.16em] text-navy uppercase">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block py-3 text-[13px] tracking-[0.16em] text-navy uppercase">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
