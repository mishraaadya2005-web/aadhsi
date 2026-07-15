import { featuredProducts } from "../data/products";

function FeaturedProducts() {
  return (
    <section className="px-[5%] py-12 sm:py-20 bg-[#1E1B1B]">
      
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-[#D98C95] mb-1 text-xs sm:text-sm tracking-wider uppercase">
          Trending Picks ✨
        </p>
        <h2 className="text-3xl sm:text-5xl text-[#F7F3F0] font-bold">
          Featured Products
        </h2>
      </div>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#2A2525] rounded-[20px] sm:rounded-[25px] p-3 sm:p-4 cursor-pointer hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Image Wrapper - aspect-square stops the card heights from getting too long */}
              <div className="w-full aspect-square bg-gray-900 rounded-[14px] sm:rounded-[18px] overflow-hidden mb-3 sm:mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Adjustments */}
              <h3 className="text-sm sm:text-lg text-[#F7F3F0] font-medium line-clamp-1">
                {product.name}
              </h3>

              <p className="text-[#D98C95] text-sm sm:text-base font-semibold mt-1">
                ₹{product.price}
              </p>
            </div>

            {/* Compact CTA Button */}
            <button className="w-full mt-4 bg-[#D98C95] text-black font-bold py-2 sm:py-3 text-xs sm:text-sm rounded-full hover:bg-[#c57781] hover:text-white transition active:scale-95">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
    </section>
  );
}

export default FeaturedProducts;