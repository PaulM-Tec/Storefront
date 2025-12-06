
import { CartSchema, ProductsSchema, ProductSchema, type Cart } from './schemas'

const BASE = 'http://localhost:4000'

async function parse<T>(res: Response, schema: any): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  const data = await res.json()
  return schema.parse(data)
}

export const api = {
  async products() {
    const res = await fetch(`${BASE}/products`, { credentials: 'include' })
    return parse(res, ProductsSchema)
  },
  async addToCart(productId: string, quantity = 1) {
    const res = await fetch(`${BASE}/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
    return parse<Cart>(res, CartSchema)
  },
  async patchCart(items: Array<{ productId: string; quantity: number }>) {
    const res = await fetch(`${BASE}/cart`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    return parse<Cart>(res, CartSchema)
  },
  async getCart() {
    const res = await fetch(`${BASE}/cart`, { credentials: 'include' })
    return parse<Cart>(res, CartSchema)
  }
}
