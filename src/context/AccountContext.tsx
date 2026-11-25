import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { readJson, writeJson } from "../lib/storage.ts";
import type { Order, Profile } from "../types.ts";

const PROFILE_KEY = "the-original-profile";
const ORDERS_KEY = "the-original-orders";

type AccountContextValue = {
  profile: Profile | null;
  orders: Order[];
  saveProfile: (profile: Profile) => void;
  signOut: () => void;
  placeOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Order;
  getOrder: (id: string) => Order | undefined;
};

const AccountContext = createContext<AccountContextValue | null>(null);

function makeOrderId() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const tail = Math.floor(1000 + Math.random() * 9000);
  return `TO${year}${month}${day}-${tail}`;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(() =>
    readJson<Profile | null>(PROFILE_KEY, null),
  );
  const [orders, setOrders] = useState<Order[]>(() => readJson<Order[]>(ORDERS_KEY, []));

  useEffect(() => {
    writeJson(PROFILE_KEY, profile);
  }, [profile]);

  useEffect(() => {
    writeJson(ORDERS_KEY, orders);
  }, [orders]);

  function placeOrder(draft: Omit<Order, "id" | "createdAt" | "status">) {
    const order: Order = {
      ...draft,
      id: makeOrderId(),
      createdAt: new Date().toISOString(),
      status: "Placed",
    };
    setOrders((current) => {
      const next = [order, ...current];
      writeJson(ORDERS_KEY, next);
      return next;
    });
    return order;
  }

  const value: AccountContextValue = {
    profile,
    orders,
    saveProfile: setProfile,
    signOut: () => setProfile(null),
    placeOrder,
    getOrder: (id) => orders.find((order) => order.id === id),
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used within AccountProvider");
  return context;
}
