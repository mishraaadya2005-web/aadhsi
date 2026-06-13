import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts } from "../services/products";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category?.toLowerCase() === category.toLowerCase();

      // Fixed: Actual functionality for Price Range Filter
      let matchesPrice = true;
      if (priceRange === "₹0-₹500") {
        matchesPrice = product.price >= 0 && product.price <= 500;
      } else if (priceRange === "₹500-₹1000") {
        matchesPrice = product.price > 500 && product.price <= 1000;
      } else if (priceRange === "₹1000+") {
        matchesPrice = product.price > 1000;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "LowToHigh") return a.price - b.price;
      if (sort === "HighToLow") return b.price - a.price;
      // Default / Newest sorting logic can be applied if items have timestamps (e.g., b.id - a.id)
      return 0;
    });

  return (
    <>
      <Navbar />

      <section className="bg-[#1E1B1B] min-h-screen text-[#F7F3F0] px-[5%] py-12">
        
        {/* 1. Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-serif mb-4">
            Shop <span className="text-[#D98C95]">AADSHI</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Handmade gifts crafted with love.
          </p>
        </div>

        {/* 2. Controls Toolbar Section (Search + Filters Alignment) */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-16 w-full">
          
          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#2A2525] rounded-full py-4 pl-14 pr-6 outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D98C95]/50 transition"
            />
          </div>

          {/* Filter Dropdowns Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto justify-end">
            
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => {
                  setShowCategory(!showCategory);
                  setShowPrice(false);
                  setShowSort(false);
                }}
                className="bg-[#2A2525] rounded-full px-6 py-4 min-w-[180px] w-full sm:w-auto flex justify-between items-center gap-2 hover:bg-[#332c2c] transition"
              >
                <span>{category === "All" ? "Category" : category}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showCategory ? "rotate-180" : ""}`} />
              </button>

              {showCategory && (
                <div className="absolute top-16 left-0 w-full bg-[#2A2525] border border-[#3A3333] rounded-2xl overflow-hidden shadow-2xl z-50">
                  {["All", "Bouquets", "Keychains", "Gift Combos"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setShowCategory(false);
                      }}
                      className="block w-full text-left px-6 py-3.5 hover:bg-[#D98C95] hover:text-white transition text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => {
                  setShowPrice(!showPrice);
                  setShowCategory(false);
                  setShowSort(false);
                }}
                className="bg-[#2A2525] rounded-full px-6 py-4 min-w-[180px] w-full sm:w-auto flex justify-between items-center gap-2 hover:bg-[#332c2c] transition"
              >
                <span>{priceRange === "All" ? "Price Range" : priceRange}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showPrice ? "rotate-180" : ""}`} />
              </button>

              {showPrice && (
                <div className="absolute top-16 left-0 w-full bg-[#2A2525] border border-[#3A3333] rounded-2xl overflow-hidden shadow-2xl z-50">
                  {["All", "₹0-₹500", "₹500-₹1000", "₹1000+"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setPriceRange(item);
                        setShowPrice(false);
                      }}
                      className="block w-full text-left px-6 py-3.5 hover:bg-[#D98C95] hover:text-white transition text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => {
                  setShowSort(!showSort);
                  setShowCategory(false);
                  setShowPrice(false);
                }}
                className="bg-[#2A2525] rounded-full px-6 py-4 min-w-[180px] w-full sm:w-auto flex justify-between items-center gap-2 hover:bg-[#332c2c] transition"
              >
                <span>
                  {sort === "Newest" && "Newest"}
                  {sort === "LowToHigh" && "Price: Low → High"}
                  {sort === "HighToLow" && "Price: High → Low"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showSort ? "rotate-180" : ""}`} />
              </button>

              {showSort && (
                <div className="absolute top-16 left-0 w-full bg-[#2A2525] border border-[#3A3333] rounded-2xl overflow-hidden shadow-2xl z-50">
                  {[
                    { label: "Newest", value: "Newest" },
                    { label: "Low → High", value: "LowToHigh" },
                    { label: "High → Low", value: "HighToLow" }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setSort(item.value);
                        setShowSort(false);
                      }}
                      className="block w-full text-left px-6 py-3.5 hover:bg-[#D98C95] hover:text-white transition text-sm"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. Products Grid Section */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl mb-3 font-semibold">No Products Found</h2>
            <p className="text-gray-400">
              Try changing your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-[#2A2525] rounded-[25px] p-4 hover:-translate-y-2 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square rounded-[20px] bg-gray-300 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700" />
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Wishlist logic here
                      }}
                      className="absolute top-3 right-3 bg-[#1E1B1B]/80 hover:bg-[#D98C95] p-2.5 rounded-full text-white transition backdrop-blur-sm"
                    >
                      <Heart size={16} />
                    </button>

                    {/* Sold Out Badge */}
                    {product.stock === 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="mt-4 px-1">
                    <h3 className="text-lg font-medium text-white line-clamp-1 group-hover:text-[#D98C95] transition">
                      {product.name}
                    </h3>
                    <p className="text-[#D98C95] font-semibold text-lg mt-1">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="mt-3 px-1">
                  <p className="text-green-400 text-xs flex items-center gap-1 font-medium">
                    ✨ Customizable
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Shop;