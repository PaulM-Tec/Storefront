
import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { Product } from '../api/schemas'
import ProductGrid from '../components/ProductGrid'
import { useCart } from '../store/cart'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { load } = useCart()

  useEffect(() => {
    (async () => {
      const data = await api.products()
      setProducts(data)
      setLoading(false)
      load()
    })()
  }, [load])

  return (
    <>
      <h1>Products</h1>
      {loading ? <p>Loading...</p> : <ProductGrid products={products} />}
    </>
  )
}
