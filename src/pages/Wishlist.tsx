import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard.tsx";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary } from "../components/ui.tsx";
import { useWishlist } from "../context/WishlistContext.tsx";

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <PageWidth className="py-12">
      <Seo
        title="Wishlist — THE ORIGINAL"
        description="Products you have saved at THE ORIGINAL. The list stays in this browser."
      />
      <p className="text-[12px] tracking-[0.2em] uppercase text-gold">Saved</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-navy">Wishlist</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-mute">
        Saved products stay on this device. They are not tied to a server account.
      </p>
      {items.length === 0 ? (
        <div className="mt-10 border border-line bg-ivory px-6 py-14">
          <h2 className="font-serif text-3xl text-navy">Nothing saved yet.</h2>
          <p className="mt-2 text-sm text-mute">Use the heart on a product to keep it here.</p>
          <Link to="/shop" className={`${btnPrimary} mt-6`}>
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </PageWidth>
  );
}
