import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/products'

function Shop() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts()
      console.log(data)
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Shop Page
      </h1>

      <div className="grid grid-cols-3 gap-5">

        {products.map((product) => (

          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border p-5 rounded-xl block"
          >

            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p>{product.category}</p>

            <p>₹ {product.price}</p>

          </Link>

        ))}

      </div>

    </div>
  )
}

export default Shop