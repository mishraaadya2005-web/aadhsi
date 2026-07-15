import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth";
import {
  getCartItems,
  removeCartItem
} from "../services/cart";
import { shopProducts } from "../data/shopProducts";
import { createOrder } from "../services/order";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const user = await getCurrentUser();

    if (!user) return;

    const items = await getCartItems(user.id);

    setCartItems(items);
  };

  const handleRemove = async (itemId) => {
  const success = await removeCartItem(itemId);

  if (success) {
    setCartItems(
      cartItems.filter(item => item.id !== itemId)
    );
  } else {
    alert("Failed to remove item");
  }
  };

  const subtotal = cartItems.reduce((acc, item) => {
  const product = shopProducts.find(
    (p) => p.id === item.product_id
  );

  const price = Number(
    product?.price?.replace("₹", "") || 0
  );

  return acc + price * item.quantity;
}, 0);

  const delivery = 99;
  const total = subtotal + delivery;

  const handleCheckout = async () => {
  const user = await getCurrentUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const success = await createOrder({
    user_id: user.id,
    total_price: total,
    payment_status: "pending",
    order_status: "pending",
  });

  if (success) {
    alert("Order created!");
  } else {
    alert("Order failed");
  }
};

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
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-6">
              {cartItems.map((item) => {
                const product = shopProducts.find(
                  (p) => p.id === item.product_id
                );
                return(
                <div
                  key={item.id}
                  className="bg-[#2A2525] rounded-[30px] p-5 flex flex-col md:flex-row gap-5"
                >
                  <div className="w-full md:w-[140px] h-[140px] bg-gray-300 rounded-[20px] overflow-hidden">
                    <img
                      src="https://placehold.co/120x120"
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl mb-2">
                        {product?.name}
                      </h3>

                      <p className="text-[#D98C95] text-xl">
                        {product?.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 flex-wrap gap-4">

                      {/* Quantity */}
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-[#1E1B1B]">
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

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>

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
              );
})}
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="bg-[#2A2525] rounded-[30px] p-8 sticky top-28">

                <h2 className="text-3xl mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 text-lg">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-mono font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Matrix</span>
                    <span className="text-white font-mono font-bold">₹{delivery}</span>
                  </div>

                  <hr className="border-[#433D3D]" />

                  <div className="flex justify-between text-2xl font-semibold">
                    <span>Total</span>

                    <span className="text-[#D98C95]">
                      ₹{total}
                    </span>
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

                <button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-[#D98C95] text-white py-4 rounded-full text-lg hover:opacity-90 transition">
                  Proceed To Checkout
                </button>

                <Link
                  to="/shop"
                  className="block text-center mt-5 text-gray-400 hover:text-white"
                >
                  Continue Shopping
                </Link>

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