export type CategoryId = "spices" | "dry-fruits" | "nuts-seeds" | "gifts";

export type Variant = {
  id: string;
  label: string;
  price: number;
  detail: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  keywords: string;
  categories: CategoryId[];
  image: string;
  imageAlt: string;
  imageNote?: string;
  photoCaption?: string;
  ingredients: string[];
  ingredientNote?: string;
  storage: string;
  contents?: string[];
  variants: Variant[];
  bestseller?: boolean;
};

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type Address = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  variantId: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  address: Address;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  promoCode: string | null;
  status: "Placed";
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};
