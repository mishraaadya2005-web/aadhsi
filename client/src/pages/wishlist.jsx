import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext"; // 🌟 Injected state context engine

function Wishlist() {
  const { addToCart } = useCart();

  // Temporary local mock state array matching your global schema format. 
  // Switch this array hook out for your DB data context fetch logic when backend wires are live!
  const wishlistItems = [
    {
      id: 1,
      name: "Rose Crochet Bouquet",
      price: 499,
      image: "https://placehold.co/300x300",
      stock: 1
    },
    {
      id: 2,
      name: "Tulip Bouquet",
      price: 599,
      image: "https://placehold.co/300x300",
      stock: 1
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#1E1B1B] text-[#F7F3F0] flex flex-col justify-between">
      
      {/* PRIMARY WORKSPACE VIEWPORT */}
      <section className="max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 animate-fadeIn">
        
        {/* Dynamic Context Header Block */}
        <div className="mb-8 md:mb-12">
          <p className="text-[#D98C95] text-xs font-bold uppercase tracking-widest">
            Your Favorites ❤️
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight mt-1 text-white">
            Wishlist
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          /* PURE MINIMALIST EMPTY WIDGET VIEWPORT */
          <div className="text-center py-20 bg-[#2A2525]/30 border border-dashed border-gray-800 rounded-[25px] max-w-xl mx-auto px-6">
            <Heart size={48} className="mx-auto mb-4 text-[#D98C95] opacity-80" />
            <h2 className="text-xl font-bold font-serif mb-2 text-white">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6 font-medium">
              Save your favorite handmade bouquets here while exploring the store.
            </p>
            <Link 
              to="/shop" 
              className="inline-block bg-[#D98C95] text-[#1E1B1B] font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#D98C95]/90 transition-all shadow-md"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          /* PREMIUM GRID ARCHITECTURE: 2 COLUMNS ON PHONE, 4 COLUMNS ON DESKTOP */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#2A2525]/40 border border-gray-800/60 rounded-[25px] p-3 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-md"
              >
                <div>
                  {/* Aspect Square Image Frame Block */}
                  <div className="relative aspect-square rounded-[18px] bg-gray-900 overflow-hidden shadow-inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    />
                  </div>

                  {/* Text Frame Typography */}
                  <div className="mt-3 px-1 space-y-0.5">
                    <h3 className="text-sm font-bold font-serif text-white line-clamp-1 group-hover:text-[#D98C95] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[#D98C95] font-mono font-bold text-xs sm:text-sm">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                {/* RESPONSIVE FLAT ACTION FLEX BUTTON MATRIX */}
                <div className="mt-4 px-1 flex gap-2 items-center">
                  <button
                    onClick={() => {
                      addToCart(item);
                      alert(`🎉 Added "${item.name}" to your shopping bag!`);
                    }}
                    className="flex-1 bg-[#D98C95] hover:bg-[#D98C95]/90 text-[#1E1B1B] font-extrabold text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag size={11} />
                    <span>Add</span>
                  </button>

                  <button
                    onClick={() => alert(`Remove flow triggered for: ${item.name}`)}
                    className="bg-[#1E1B1B] text-rose-400/80 hover:text-rose-400 hover:bg-rose-950/20 border border-gray-800/80 hover:border-rose-900/40 p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex-shrink-0"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER PLATFORM PLACEMENT */}
      <Footer />
      
    </div>
  );
}

export default Wishlist;