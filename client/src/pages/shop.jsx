import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { shopProducts } from "../data/shopProducts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function CustomDropdown({ title, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(title);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#2A2525] text-white px-6 py-4 rounded-full flex items-center justify-between min-w-[190px]"
      >
        {selected}
        <span className={`ml-4 transition ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && (
        <div className="absolute top-[70px] left-0 w-full bg-[#322C2C] rounded-[25px] overflow-hidden shadow-2xl z-50">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                setSelected(item);
                setOpen(false);
              }}
              className="px-6 py-4 cursor-pointer border-b border-[#433D3D] hover:bg-[#D98C95] hover:pl-8 transition-all"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Shop() {
  return (
    <>
      <Navbar />

      <section className="bg-[#1E1B1B] min-h-screen px-[5%] py-10 text-[#F7F3F0]">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[#D98C95] mb-2">Handmade Collection ✨</p>
          <h1 className="text-6xl mb-4">Shop AADSHI</h1>
          <p className="text-gray-400">Handmade gifts crafted with love.</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 min-w-[250px] p-4 rounded-full bg-[#2A2525] outline-none text-white"
          />

          <CustomDropdown
            title="Category"
            options={["Bouquets", "Keychains", "Gift Combos"]}
          />

          <CustomDropdown
            title="Price Range"
            options={["₹0-₹500", "₹500-₹1000"]}
          />

          <CustomDropdown
            title="Sort By"
            options={["Newest", "Low → High", "High → Low"]}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {shopProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#2A2525] p-4 rounded-[25px] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <div className="h-45 bg-gray-300 rounded-[18px] mb-4 relative">

                <button className="absolute top-3 left-3 bg-[#1E1B1B]/80 p-2 rounded-full z-10 hover:bg-[#D98C95] transition">
                  <Heart size={18} />
                </button>

                {product.soldOut && (
                  <span className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full text-sm">
                    Sold Out
                  </span>
                )}
              </div>

              <h3 className="text-lg">{product.name}</h3>
              <p className="text-[#D98C95] mt-2">{product.price}</p>

              {product.customizable && (
                <p className="text-green-400 mt-2 text-sm">✨ Customizable</p>
              )}

              <Link to={`/product/${product.id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;