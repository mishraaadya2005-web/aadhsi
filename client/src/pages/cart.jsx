import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // 🌟 Import context bridge

function Cart() {
  // Read live structural state keys and functions straight out of global engine context
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 99 : 0;
  const total = subtotal + delivery;

  return (
    <div className="w-full min-h-screen bg-[#1E1B1B] text-[#F7F3F0] flex flex-col justify-between">
      <section className="max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 animate-fadeIn">
        
        <div className="mb-8 md:mb-12">
          <p className="text-[#D98C95] text-xs font-bold uppercase tracking-widest">Shopping Bag ✨</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight mt-1 text-white">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-[#2A2525]/30 border border-dashed border-gray-800 rounded-[30px] max-w-xl mx-auto px-6">
            <div className="text-5xl mb-4 opacity-80">🛒</div>
            <h2 className="text-xl font-bold font-serif mb-2 text-white">Your Cart is Empty</h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6 font-medium">
              Looks like you haven't added any premium selections to your workspace catalog yet.
            </p>
            <Link to="/shop" className="inline-block bg-[#D98C95] text-[#1E1B1B] font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#D98C95]/90 transition-all shadow-md">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LIVE DYNAMIC CARD STREAM SECTION */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="group bg-[#2A2525]/40 border border-gray-800/60 rounded-[25px] p-4 flex gap-4 sm:gap-6 items-center justify-between transition-all duration-300">
                  
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#1E1B1B] border border-gray-800/80 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-sm sm:text-base font-bold font-serif text-white truncate">{item.name}</h3>
                      <p className="text-[#D98C95] font-mono font-bold text-xs sm:text-sm">₹{item.price}</p>

                      {/* LIVE TACTILE ACTION INTERFACES */}
                      <div className="flex items-center gap-3 bg-[#1E1B1B]/80 border border-gray-800/60 w-fit px-1.5 py-1 rounded-xl mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="w-6 h-6 rounded-lg text-gray-400 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono min-w-[14px] text-center text-gray-200">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="w-6 h-6 rounded-lg text-gray-400 hover:text-white flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full pl-2">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-semibold text-rose-400/80 hover:text-rose-400 bg-rose-950/10 hover:bg-rose-950/20 border border-rose-900/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* LIVE DYNAMIC BILLING CALCULATION FRAME */}
            <div className="lg:col-span-1 lg:sticky lg:top-6">
              <div className="bg-[#2A2525]/40 border border-gray-800/40 rounded-[30px] p-6 space-y-5 shadow-xl">
                <h2 className="text-lg font-bold font-serif text-white tracking-wide border-b border-gray-900/40 pb-3.5">Order Summary</h2>

                <div className="space-y-3.5 text-xs font-medium text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-mono font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Matrix</span>
                    <span className="text-white font-mono font-bold">₹{delivery}</span>
                  </div>
                  <hr className="border-gray-900/40" />
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm text-white font-bold">Estimated Total</span>
                    <span className="text-[#D98C95] font-mono text-xl font-extrabold tracking-tight">₹{total}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button className="w-full bg-[#D98C95] hover:bg-[#D98C95]/90 text-[#1E1B1B] font-extrabold py-3.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-widest cursor-pointer text-center">
                    Proceed To Checkout 🚀
                  </button>
                  <Link to="/shop" className="block text-center text-[11px] font-bold tracking-wider uppercase text-gray-500 hover:text-white transition-colors">
                    ← Continue Shopping
                  </Link>
                </div>

              </div>
            </div>

          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Cart;