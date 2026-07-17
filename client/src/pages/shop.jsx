import { useEffect, useState } from "react";
import { Heart, ChevronDown, ShoppingBag, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";
import { getProducts } from "../services/products";
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti'; // 🌟 Make sure to import this here

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [priceRange, setPriceRange] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [addingProductId, setAddingProductId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || product.category?.toLowerCase() === category.toLowerCase();
      
      let matchesPrice = true;
      if (priceRange === "₹0-₹500") matchesPrice = product.price >= 0 && product.price <= 500;
      else if (priceRange === "₹500-₹1000") matchesPrice = product.price > 500 && product.price <= 1000;
      else if (priceRange === "₹1000+") matchesPrice = product.price > 1000;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "LowToHigh") return a.price - b.price;
      if (sort === "HighToLow") return b.price - a.price;
      return 0;
    });

  const handleAddToBag = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Set the active product ID to trigger the temporary text change
    setAddingProductId(product.id);
    
    // Confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#D98C95', '#F7F3F0', '#2A2525']
    });

    setToastMessage(`Added "${product.name}" to your bag!`);
    
    // Reset both states after their respective timeouts
    setTimeout(() => setAddingProductId(null), 2000);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#1E1B1B] text-[#F7F3F0] flex flex-col justify-between relative overflow-x-hidden">
      
      {/* 🌸 TOAST NOTIFICATION MODULE LAYER */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#2A2525] border border-emerald-500/30 text-white flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl animate-fade-in">
          <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      <section className="max-w-7xl w-full mx-auto px-[4%] sm:px-[5%] py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl md:text-7xl font-serif mb-2 sm:mb-4">
            Shop <span className="text-[#D98C95]">AADSHI</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg">
            Handmade gifts crafted with love.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="relative z-30 flex flex-wrap gap-2 sm:gap-3 w-full items-center mb-6 sm:mb-8">            
          <div className="relative z-40">
            <button
              onClick={() => { setShowCategory(!showCategory); setShowPrice(false); setShowSort(false); }}
              className="bg-[#2A2525] rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm flex items-center gap-2 hover:bg-[#332c2c] transition text-gray-300 cursor-pointer"
            >
              <span>{category === "All" ? "Category" : category}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${showCategory ? "rotate-180" : ""}`} />
            </button>
            {showCategory && (
              <div className="absolute top-11 sm:top-13 left-0 min-w-[160px] bg-[#2A2525] border border-[#3A3333] rounded-xl overflow-hidden shadow-2xl z-50">
                {["All", "Bouquets", "Keychains", "Gift Combos"].map((item) => (
                  <button key={item} onClick={() => { setCategory(item); setShowCategory(false); }} className="block w-full text-left px-4 py-2.5 hover:bg-[#D98C95] hover:text-black transition text-xs sm:text-sm cursor-pointer">{item}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative z-40">
            <button
              onClick={() => { setShowPrice(!showPrice); setShowCategory(false); setShowSort(false); }}
              className="bg-[#2A2525] rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm flex items-center gap-2 hover:bg-[#332c2c] transition text-gray-300 cursor-pointer"
            >
              <span>{priceRange === "All" ? "Price Range" : priceRange}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${showPrice ? "rotate-180" : ""}`} />
            </button>
            {showPrice && (
              <div className="absolute top-11 sm:top-13 left-0 min-w-[160px] bg-[#2A2525] border border-[#3A3333] rounded-xl overflow-hidden shadow-2xl z-50">
                {["All", "₹0-₹500", "₹500-₹1000", "₹1000+"].map((item) => (
                  <button key={item} onClick={() => { setPriceRange(item); setShowPrice(false); }} className="block w-full text-left px-4 py-2.5 hover:bg-[#D98C95] hover:text-black transition text-xs sm:text-sm cursor-pointer">{item}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative z-40">
            <button
              onClick={() => { setShowSort(!showSort); setShowCategory(false); setShowPrice(false); }}
              className="bg-[#2A2525] rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm flex items-center gap-2 hover:bg-[#332c2c] transition text-gray-300 cursor-pointer"
            >
              <span>
                {sort === "Newest" && "Sort: Newest"}
                {sort === "LowToHigh" && "Price: Low → High"}
                {sort === "HighToLow" && "Price: High → Low"}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${showSort ? "rotate-180" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute top-11 sm:top-13 left-0 min-w-[180px] bg-[#2A2525] border border-[#3A3333] rounded-xl overflow-hidden shadow-2xl z-50">
                {[
                  { label: "Newest", value: "Newest" },
                  { label: "Low → High", value: "LowToHigh" },
                  { label: "High → Low", value: "HighToLow" }
                ].map((item) => (
                  <button key={item.value} onClick={() => { setSort(item.value); setShowSort(false); }} className="block w-full text-left px-4 py-2.5 hover:bg-[#D98C95] hover:text-black transition text-xs sm:text-sm cursor-pointer">{item.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl mb-2 font-semibold">No Products Found</h2>
            <p className="text-sm text-gray-400">Try changing your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-[#2A2525] rounded-[20px] sm:rounded-[25px] p-2.5 sm:p-4 hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between group shadow-lg cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square rounded-[15px] sm:rounded-[20px] bg-gray-900 overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gray-800" />
                    )}

                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className="absolute top-2 right-2 bg-[#1E1B1B]/80 hover:bg-[#D98C95] p-2 rounded-full text-white hover:text-black transition backdrop-blur-sm z-10 cursor-pointer"
                    >
                      <Heart size={14} className="sm:w-4 sm:h-4" />
                    </button>

                    {product.stock === 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-medium shadow-md z-10">
                        Sold Out
                      </span>
                    )}
                  </div>

                  <div className="mt-3 px-0.5">
                    <h3 className="text-sm sm:text-lg font-medium text-white line-clamp-1 group-hover:text-[#D98C95] transition">
                      {product.name}
                    </h3>
                    <p className="text-[#D98C95] font-semibold text-sm sm:text-lg mt-0.5 sm:mt-1">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <p className="text-green-400 text-[10px] sm:text-xs flex items-center gap-1 font-medium">
                    ✨ Customizable
                  </p>
                  
                  {/* 🌟 NEW ADD TO BAG BUTTON AT THE BOTTOM OF CARDS */}
                  <button
                    disabled={product.stock === 0}
                    onClick={(e) => handleAddToBag(product, e)}
                    className={`w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide py-2.5 rounded-xl transition shadow-sm cursor-pointer active:scale-98
                      ${product.stock === 0 
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                        : addingProductId === product.id
                          ? "bg-emerald-600 text-white font-extrabold" // 🌟 Success style when clicked
                          : "bg-[#D98C95] hover:bg-[#c57781] text-[#1E1B1B] font-extrabold"
                      }`}
                  >
                    <ShoppingBag size={14} />
                    {product.stock === 0 
                      ? "Out of Stock" 
                      : addingProductId === product.id 
                        ? "Added!" 
                        : "Add to Bag"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🌟 PRODUCT DETAIL MODAL DRAWER OVERLAY */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative bg-[#2A2525] border border-gray-800 max-w-sm w-full rounded-[25px] p-5 shadow-2xl z-10 space-y-4 animate-fade-in">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-[#1E1B1B] w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-xs"
            >
              ✕
            </button>

            <div className="aspect-square w-full rounded-[18px] overflow-hidden bg-gray-900">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#D98C95] tracking-widest">{selectedProduct.category || "Handmade Collection"}</span>
              <h2 className="text-xl font-serif font-bold text-white">{selectedProduct.name}</h2>
              <p className="text-[#D98C95] font-bold text-lg">₹{selectedProduct.price}</p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Beautifully handcrafted with love. Perfect for gifts or celebrating special moments with premium customizable features.
            </p>

            <button 
              disabled={selectedProduct.stock === 0}
              onClick={(e) => { handleAddToBag(selectedProduct, e); setSelectedProduct(null); }}
              className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wide rounded-xl transition active:scale-98 cursor-pointer
                ${selectedProduct.stock === 0 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-[#D98C95] text-[#1E1B1B] font-extrabold hover:bg-[#c57781]"
                }`}
            >
              <ShoppingBag size={14} />
              {selectedProduct.stock === 0 ? "Out of Stock" : "Add to Bag"}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Shop;