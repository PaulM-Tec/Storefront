import { products } from "../data/products";

export type CartItem = { productId: string; quantity: number };
export type Cart = {
  id: string;
  items: Array<{ productId: string; quantity: number; price: number; name: string }>;
  subtotal: number;
};

const carts = new Map<string, CartItem[]>();

export function computeCart(cartId: string): Cart {
  const raw = carts.get(cartId) ?? [];
  const items = raw.map(({ productId, quantity }) => {
    const p = products.find(p => p.id === productId);
    if (!p) return null;
    return { productId, quantity, price: p.price, name: p.name };
  }).filter(Boolean) as Cart['items'];
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { id: cartId, items, subtotal: Math.round(subtotal * 100) / 100 };
}

export function addToCart(cartId: string, productId: string, quantity: number): Cart {
  const arr = carts.get(cartId) ?? [];
  const idx = arr.findIndex(i => i.productId === productId);
  if (idx >= 0) arr[idx].quantity += quantity; else arr.push({ productId, quantity });
  carts.set(cartId, arr.filter(i => i.quantity > 0));
  return computeCart(cartId);
}

export function replaceCart(cartId: string, items: CartItem[]): Cart {
  carts.set(cartId, items.filter(i => i.quantity > 0));
  return computeCart(cartId);
}
