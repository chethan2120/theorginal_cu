import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "../data/products.ts";
import { readJson, writeJson } from "../lib/storage.ts";
import type { Product } from "../types.ts";

const KEY = "the-original-wishlist";

type WishlistContextValue = {
  ids: string[];
  items: Product[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readJson<string[]>(KEY, []));

  useEffect(() => {
    writeJson(KEY, ids);
  }, [ids]);

  const items = useMemo(
    () =>
      ids.flatMap((id) => {
        const product = products.find((item) => item.id === id);
        return product ? [product] : [];
      }),
    [ids],
  );

  function toggle(productId: string) {
    setIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  const value: WishlistContextValue = {
    ids,
    items,
    has: (productId) => ids.includes(productId),
    toggle,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
