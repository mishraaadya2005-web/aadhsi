import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingBag, ChevronRight, Star, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSingleProduct } from "../services/products";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [pincode, setPincode] = useState("226001");

  useEffect(() => {
    async function fetchProductData() {
      try {
        const data = await getSingleProduct(id);
        setProduct(data);
        
        // Automatically select the first available color option if they exist
        if (data && data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (err) {
        console.error("Error loading product data:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1B1B] flex items-center justify-center text-[#F7F3F0]">
        <div className="animate-pulse text-sm tracking-widest uppercase text-[#D98C95]">Loading Masterpiece...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1E1B1B] flex flex-col items-center justify-center text-[#F7F3F0] gap-4">
        <h2 className="text-xl font-serif">Product Not Found</h2>
        <Link to="/shop" className="text-xs uppercase bg-[#D98C95] text-black font-bold px-6 py-3 rounded-full">Back to Shop</Link>
      </div>
    );
  }

  const productPrice = product.price || 0;
  const calculatedMRP = Math.round(productPrice / 0.8);

  // 🛠️ AUTOMATIC VARIATION CHECKER
  // This looks at your database item. If Aadya passes a comma-separated string or an array of colors, it splits it.
  // Example formats supported: ["Red", "Blue"] OR "Red, Blue, Green"
  let colorOptions = [];
  if (product.colors) {
    colorOptions = Array.isArray(product.colors) 
      ? product.colors 
      : product.colors.split(",").map(c => c.trim());
  }

  return (
    <>
      <Navbar />

      <section className="bg-[#1E1B1B] min-h-screen text-[#F7F3F0] px-[5%] py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-white transition">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-gray-400 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Master Content Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          
          {/* LEFT COLUMN: CRISP SINGLE IMAGE DISPLAY */}
          <div className="lg:col-span-6 w-full sticky top-24">
            <div className="relative aspect-square bg-[#2A2525] rounded-[24px] overflow-hidden border border-gray-800/40 shadow-2xl">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#2A2525] flex items-center justify-center text-gray-600 text-xs">No Image Available</div>
              )}
              {product.stock === 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: DYNAMIC INFORMATION SUITE */}
          <div className="lg:col-span-6 flex flex-col gap-5 w-full">
            
            {/* Title & Conditional Rating Block */}
            <div>
              {/* ⭐ CONDITIONAL RATING: Only shows if rating data actually exists in Supabase */}
              {product.rating_value && product.rating_value > 0 ? (
                <div className="flex items-center gap-1.5 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.round(product.rating_value) ? "currentColor" : "none"} className={i < Math.round(product.rating_value) ? "" : "text-gray-600"} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.review_count || 1} review)</span>
                </div>
              ) : null}

              <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-[10px] text-gray-500 font-mono mt-1 tracking-wider uppercase">SKU: MNHKCHS-{product.id?.slice(0, 8) || "DEFAULT"}</p>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#2A2525]/30 border border-gray-800/40 p-4 rounded-xl">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif text-[#D98C95] font-semibold">₹{productPrice}</span>
                <span className="text-sm text-gray-500 line-through">MRP ₹{calculatedMRP}</span>
                <span className="bg-[#D98C95]/10 text-[#D98C95] border border-[#D98C95]/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  SAVE 20%
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium mt-1">GST Included & Free Handcrafted Custom Packaging</p>
            </div>

            {/* Description Text Segment */}
            <p className="text-gray-300 text-xs leading-relaxed font-light">
              {product.description || "Add a handcrafted touch of love to your space, bouquets, or keys with this premium piece. Soft, vibrant, and everlasting, they are meticulously engineered for gifting, custom decor styling, and luxury craft collection display."}
            </p>

            {/* Material Pills */}
            <div className="flex gap-2 flex-wrap text-[11px] font-medium text-gray-300">
              <span className="bg-[#2A2525] border border-gray-800 px-3 py-1.5 rounded-full">🪡 Premium Combed Yarn</span>
              <span className="bg-[#2A2525] border border-gray-800 px-3 py-1.5 rounded-full">🧶 Mercerised Organic Cotton</span>
              <span className="bg-[#2A2525] border border-gray-800 px-3 py-1.5 rounded-full">🇮🇳 Proudly Handmade In India</span>
            </div>

            {/* Warning Notice Disclaimer */}
            <div className="text-[11px] text-rose-400/90 font-medium tracking-wide bg-rose-950/10 border border-rose-900/20 p-3 rounded-xl">
              ⚠️ Non-Exchangeable, Non-Returnable & Non-Refundable Custom Product
            </div>

            {/* Delivery Checker */}
            <div className="border border-gray-800 bg-[#2A2525]/40 rounded-xl p-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#D98C95]" />
                <input 
                  type="text" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-white outline-none w-24 border-b border-transparent focus:border-gray-700 pb-0.5"
                />
              </div>
              <button onClick={() => alert(`Availability confirmed near area code ${pincode}!`)} className="text-xs text-[#D98C95] hover:underline font-semibold font-mono">Check</button>
            </div>

            {/* 🎨 CONDITIONAL COLORS OPTIONS MATRIX */}
            {/* If the product has no colors specified, this entire section stays completely hidden! */}
            {colorOptions.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Options: <span className="text-white font-normal capitalize">{selectedColor || colorOptions[0]}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs px-4 py-2 rounded-lg border transition-all duration-200 uppercase tracking-wide font-medium ${
                        selectedColor === color
                          ? "bg-[#D98C95] text-black border-[#D98C95] font-bold shadow-md shadow-[#D98C95]/5"
                          : "border-gray-800 bg-[#2A2525]/30 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex gap-4 items-center pt-3">
              <div className="flex items-center border border-gray-800 bg-[#2A2525] rounded-full p-1">
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-10 h-10 font-bold text-gray-400 hover:text-white transition" disabled={product.stock === 0}>-</button>
                <span className="font-mono px-3 text-xs font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className="w-10 h-10 font-bold text-gray-400 hover:text-white transition" disabled={product.stock === 0}>+</button>
              </div>

              <button 
                onClick={() => alert(`🎉 Added ${quantity} x "${product.name}" ${selectedColor ? `(${selectedColor})` : ""} to your bag!`)}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition duration-300 ${
                  product.stock === 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-[#D98C95] text-black hover:opacity-90 shadow-lg shadow-[#D98C95]/10"
                }`}
              >
                <ShoppingBag size={14} />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart Bag"}
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetail;