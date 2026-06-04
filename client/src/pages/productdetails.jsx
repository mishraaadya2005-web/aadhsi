import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { shopProducts } from "../data/shopProducts";

function ProductDetails() {
  const { id } = useParams();

  const product = shopProducts.find(
    (item) => item.id === Number(id)
  );

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1E1B1B] text-white flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  const relatedProducts = shopProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#1E1B1B] text-[#F7F3F0] px-6 py-12">

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Product Image */}
          <div className="bg-[#2A2525] rounded-3xl p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">

            <p className="text-[#D98C95] text-lg mb-3">
              Handmade Collection ✨
            </p>

            <h1 className="font-serif text-5xl mb-4">
              {product.name}
            </h1>

            <p className="text-3xl text-[#D98C95] mb-6">
              ₹{product.price}
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              {product.description ||
                "Beautiful handcrafted gift made with premium materials and lots of love. Perfect for birthdays, anniversaries, and special occasions."}
            </p>

            {product.customizable && (
              <span className="bg-[#D98C95] text-white px-4 py-2 rounded-full w-fit mb-6">
                ✨ Customizable
              </span>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">

              <button
                onClick={() =>
                  qty > 1 && setQty(qty - 1)
                }
                className="w-10 h-10 rounded-full bg-[#2A2525] hover:bg-[#D98C95] transition"
              >
                -
              </button>

              <span className="text-xl">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-full bg-[#2A2525] hover:bg-[#D98C95] transition"
              >
                +
              </button>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <button className="bg-[#D98C95] px-8 py-4 rounded-full hover:scale-105 transition">
                Add To Cart
              </button>

              <button className="border border-[#D98C95] px-8 py-4 rounded-full hover:bg-[#D98C95] transition">
                Buy Now
              </button>

            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto mt-24">

          <h2 className="font-serif text-4xl mb-10">
            You May Also Like ✨
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-[#2A2525] rounded-3xl p-4 hover:-translate-y-2 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover rounded-2xl"
                />

                <h3 className="font-serif text-xl mt-4">
                  {item.name}
                </h3>

                <p className="text-[#D98C95] mt-2">
                  ₹{item.price}
                </p>

                <Link
                  to={`/product/${item.id}`}
                  className="inline-block mt-4 bg-[#D98C95] px-5 py-2 rounded-full hover:scale-105 transition"
                >
                  View Details
                </Link>
              </div>
            ))}

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;