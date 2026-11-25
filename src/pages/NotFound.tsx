import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary } from "../components/ui.tsx";

export default function NotFound() {
  return (
    <PageWidth className="py-20">
      <Seo title="Page not found — THE ORIGINAL" description="This page is not part of THE ORIGINAL shop." />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">404</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">This page is not in the shop.</h1>
      <p className="mt-4 text-sm text-mute">The address may be mistyped, or the page was never added.</p>
      <Link to="/" className={`${btnPrimary} mt-8`}>
        Back home
      </Link>
    </PageWidth>
  );
}
