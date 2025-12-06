
import { z } from "zod";

export const AddToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().max(99),
});

export const PatchCartSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().nonnegative().max(99),
  })).min(1),
});
