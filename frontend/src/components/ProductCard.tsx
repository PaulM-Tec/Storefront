
import { Product } from '../api/schemas'
import { useCart } from '../store/cart'
import styles from '../styles/card.module.css'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  return (
    <div className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.img} />
      <div className={styles.body}>
        <h3>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.row}>
          <span className={styles.price}>R {product.price.toFixed(2)}</span>
          <button onClick={() => add(product.id)} className={styles.btn} disabled={product.stock <= 0}>Add</button>
        </div>
      </div>
    </div>
  )
}
