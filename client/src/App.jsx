import { useEffect } from 'react'
import { getProducts } from './services/products'

function App() {

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts()
      console.log(products)
    }

    fetchProducts()
  }, [])

  return (
    <div className="text-4xl font-bold text-center mt-20">
      Aadshi Backend Connected
    </div>
  )
}

export default App