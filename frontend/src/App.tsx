
import { Routes, Route, Link } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'

export default function App() {
  return (
    <div>
      <header style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to='/'>Storefront</Link>
        <Link to='/cart'>Cart</Link>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path='/' element={<ProductsPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
    </div>
  )
}
