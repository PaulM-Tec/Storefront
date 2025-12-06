
import { Product } from '../api/schemas'
import ProductCard from './ProductCard'
import styles from '../styles/grid.module.css'

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
