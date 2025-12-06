
import { create } from 'zustand'
import { api } from '../api/client'
import type { Cart } from '../api/schemas'

type CartState = {
  cart: Cart | null
  loading: boolean
  add: (productId: string, quantity?: number) => Promise<void>
  setQty: (productId: string, quantity: number) => Promise<void>
  load: () => Promise<void>
}

export const useCart = create<CartState>((set, get) => ({
  cart: null,
  loading: false,
  add: async (productId, quantity = 1) => {
    set({ loading: true })
    const cart = await api.addToCart(productId, quantity)
    set({ cart, loading: false })
  },
  setQty: async (productId, quantity) => {
    const current = get().cart
    const items = current?.items.map(i => i.productId === productId ? { ...i, quantity } : i) ?? [{ productId, quantity } as any]
    set({ loading: true })
    const cart = await api.patchCart(items.map(i => ({ productId: i.productId, quantity: i.quantity })))
    set({ cart, loading: false })
  },
  load: async () => {
    set({ loading: true })
    const cart = await api.getCart()
    set({ cart, loading: false })
  }
}))
