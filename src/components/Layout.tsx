import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.tsx";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

export function Layout() {
  const location = useLocation();
  const { notice, dismissNotice } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
  }, [location.pathname, location.search, location.key]);

  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {notice ? (
        <div
          className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 border border-line bg-navy px-4 py-3 text-sm text-paper shadow-lg"
          role="status"
        >
          <div className="flex items-start justify-between gap-4">
            <p>{notice}</p>
            <button type="button" className="text-gold-line" onClick={dismissNotice} aria-label="Dismiss notice">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
