
import { Router } from "express";
import { products } from "../data/products";

const router = Router();

router.get('/', (_req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const p = products.find(p => p.id === req.params.id);
  if (!p) return res.status(404).json({ error: "NotFound", message: "Product not found" });
  res.json(p);
});

export default router;
