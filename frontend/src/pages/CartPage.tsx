
import { useCart } from '../store/cart'

export default function CartPage() {
  const { cart, setQty } = useCart()

  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>

  return (
    <>
      <h1>Your Cart</h1>
      <ul>
        {cart.items.map(i => (
          <li key={i.productId} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ minWidth: 160 }}>{i.name}</span>
            <button onClick={() => setQty(i.productId, Math.max(0, i.quantity - 1))}>-</button>
            <span>{i.quantity}</span>
            <button onClick={() => setQty(i.productId, i.quantity + 1)}>+</button>
            <span style={{ marginLeft: 'auto' }}>Unit: R {i.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p><strong>Subtotal:</strong> R {cart.subtotal.toFixed(2)}</p>
    </>
  )
}
