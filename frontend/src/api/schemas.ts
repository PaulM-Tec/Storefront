
import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().url(),
  category: z.string(),
  stock: z.number().int().nonnegative(),
})
export type Product = z.infer<typeof ProductSchema>
export const ProductsSchema = z.array(ProductSchema)

export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().nonnegative(),
  price: z.number(),
  name: z.string(),
})
export const CartSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  subtotal: z.number(),
})
export type Cart = z.infer<typeof CartSchema>
