import { Router } from "express";
import { AddToCartSchema, PatchCartSchema } from "../schemas/cart";
import { addToCart, computeCart, replaceCart } from "../lib/cartStore";
import { randomUUID } from "crypto";

const router = Router();

function ensureCartId(req: any, res: any): string {
  let id = req.header('x-cart-id') || req.cookies?.cartId;
  if (!id) {
    id = randomUUID();
    res.cookie('cartId', id, { httpOnly: true, sameSite: 'lax' });
  }
  res.setHeader('x-cart-id', id);
  return id;
}

router.get('/', (req, res) => {
  const id = ensureCartId(req, res);
  res.json(computeCart(id));
});

router.post('/', (req, res, next) => {
  try {
    const { productId, quantity } = AddToCartSchema.parse(req.body);
    const id = ensureCartId(req, res);
    const cart = addToCart(id, productId, quantity);
    res.status(201).json(cart);
  } catch (e) { next(e); }
});

router.patch('/', (req, res, next) => {
  try {
    const { items } = PatchCartSchema.parse(req.body);
    const id = ensureCartId(req, res);
    const cart = replaceCart(id, items);
    res.json(cart);
  } catch (e) { next(e); }
});

export default router;
