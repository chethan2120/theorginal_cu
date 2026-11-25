import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DELIVERY_FEE, FREE_DELIVERY_AT, promoRates } from "../data/commerce.ts";
import { findVariant, products } from "../data/products.ts";
import { readJson, writeJson } from "../lib/storage.ts";
import type { CartLine, Product, Variant } from "../types.ts";

const CART_KEY = "the-original-cart";
const PROMO_KEY = "the-original-promo";

export type ResolvedLine = CartLine & {
  product: Product;
  variant: Variant;
  lineTotal: number;
};

type CartSummary = {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  count: number;
  promoRate: number;
};

type CartContextValue = {
  lines: ResolvedLine[];
  summary: CartSummary;
  promoCode: string | null;
  promoError: string;
  notice: string | null;
  dismissNotice: () => void;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  applyPromo: (code: string) => void;
  clearPromo: () => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function resolve(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    if (!product) return [];
    const variant = product.variants.find((item) => item.id === line.variantId);
    if (!variant) return [];
    const quantity = Math.max(1, Math.min(20, line.quantity));
    return [
      {
        productId: product.id,
        variantId: variant.id,
        quantity,
        product,
        variant,
        lineTotal: variant.price * quantity,
      },
    ];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>(() =>
    readJson<CartLine[]>(CART_KEY, []),
  );
  const [promoCode, setPromoCode] = useState<string | null>(() =>
    readJson<string | null>(PROMO_KEY, null),
  );
  const [promoError, setPromoError] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    writeJson(CART_KEY, rawLines);
  }, [rawLines]);

  useEffect(() => {
    writeJson(PROMO_KEY, promoCode);
  }, [promoCode]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const lines = useMemo(() => resolve(rawLines), [rawLines]);

  const summary = useMemo<CartSummary>(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const promoRate = promoCode ? promoRates[promoCode] ?? 0 : 0;
    const discount = Math.round(subtotal * promoRate);
    const afterDiscount = Math.max(0, subtotal - discount);
    const delivery =
      afterDiscount === 0 || afterDiscount >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE;
    return {
      subtotal,
      discount,
      delivery,
      total: afterDiscount + delivery,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      promoRate,
    };
  }, [lines, promoCode]);

  function addItem(productId: string, variantId: string, quantity = 1) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const variant = findVariant(product, variantId);
    const amount = Math.max(1, Math.min(20, quantity));
    setRawLines((current) => {
      const index = current.findIndex(
        (line) => line.productId === product.id && line.variantId === variant.id,
      );
      if (index === -1) {
        return [
          ...current,
          { productId: product.id, variantId: variant.id, quantity: amount },
        ];
      }
      return current.map((line, lineIndex) =>
        lineIndex === index
          ? { ...line, quantity: Math.min(20, line.quantity + amount) }
          : line,
      );
    });
    setNotice(`${product.name}, ${variant.label}, added to the bag.`);
  }

  function setQuantity(productId: string, variantId: string, quantity: number) {
    setRawLines((current) =>
      current.flatMap((line) => {
        if (line.productId !== productId || line.variantId !== variantId) return [line];
        if (quantity < 1) return [];
        return [{ ...line, quantity: Math.min(20, quantity) }];
      }),
    );
  }

  function removeItem(productId: string, variantId: string) {
    setRawLines((current) =>
      current.filter(
        (line) => !(line.productId === productId && line.variantId === variantId),
      ),
    );
  }

  function applyPromo(code: string) {
    const next = code.trim().toUpperCase();
    if (!next) {
      setPromoError("Enter a code.");
      return;
    }
    if (!promoRates[next]) {
      setPromoError("That code is not active. Try ORIGINAL10.");
      return;
    }
    setPromoCode(next);
    setPromoError("");
    setNotice("Code applied.");
  }

  function clearPromo() {
    setPromoCode(null);
    setPromoError("");
  }

  function clear() {
    setRawLines([]);
    setPromoCode(null);
    setPromoError("");
  }

  const value: CartContextValue = {
    lines,
    summary,
    promoCode,
    promoError,
    notice,
    dismissNotice: () => setNotice(null),
    addItem,
    setQuantity,
    removeItem,
    applyPromo,
    clearPromo,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
