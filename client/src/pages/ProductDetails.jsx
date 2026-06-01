import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../services/products'

function ProductDetails() {

  const { id } = useParams()

  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      const data = await getSingleProduct(id)
      setProduct(data)
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold">
        {product.name}
      </h1>

      <p className="mt-5 text-2xl">
        {product.category}
      </p>

      <p className="mt-5 text-3xl font-bold">
        ₹ {product.price}
      </p>
    </div>
  )
}

export default ProductDetails