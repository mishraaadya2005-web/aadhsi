import React, { useState } from 'react';

// --- DUMMY ITEMS FOR THE CART SUMMARY ---
const DUMMY_CHECKOUT_ITEMS = [
  { id: 1, name: "Classic Crimson Rose Bouquet", price: 1299, qty: 1, image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=150" },
  { id: 3, name: "Cute Amigurumi Bee Keychain", price: 299, qty: 2, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=150" }
];

function Checkout() {
  // --- FORM STATES ---
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // default to UPI

  // Calculation values
  const subtotal = DUMMY_CHECKOUT_ITEMS.reduce((total, item) => total + (item.price * item.qty), 0);
  const deliveryCharges = 60; // Standard local delivery delivery charge
  const grandTotal = subtotal + deliveryCharges;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert(`Order Placed Successfully! 🎉\nTotal Amount: ₹${grandTotal}\nPayment via: ${paymentMethod.toUpperCase()}`);
    // This is where Aadya will connect her Supabase 'orders' table insertion logic later!
  };

  return (
    <div className="min-h-screen bg-[#1E1B1B] text-[#F7F3F0] p-4 sm:p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-wide">Secure Checkout</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-8 sm:mb-10">Complete your details to bring your handmade gifts home.</p>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* COLUMN 1 & 2: SHIPPING DETAILS FORM */}
          <div className="lg:col-span-2 bg-[#2A2525] rounded-[25px] p-5 sm:p-6 md:p-8 border border-gray-800 shadow-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-[#D98C95] mb-6 border-b border-gray-800 pb-3">
              📍 Shipping & Delivery Details
            </h2>
            
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5 sm:gap-6">
              
              {/* Full Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name" 
                  className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] transition-colors text-sm w-full"
                />
              </div>

              {/* Phone & Pincode Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number" 
                    className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] transition-colors text-sm w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pincode</label>
                  <input 
                    type="text" 
                    required
                    pattern="[0-9]{6}"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g., 226001" 
                    className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] transition-colors text-sm w-full"
                  />
                </div>
              </div>

              {/* Full Address Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Complete Address</label>
                <textarea 
                  rows="3"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No, Street, Area, Landmark..." 
                  className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] transition-colors text-sm resize-none w-full"
                />
              </div>

              {/* PAYMENT SELECTION METHOD */}
              <h2 className="text-lg sm:text-xl font-semibold text-[#D98C95] mt-4 mb-2 border-b border-gray-800 pb-3">
                💳 Payment Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* UPI Option */}
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center gap-3 ${
                    paymentMethod === 'upi' ? 'bg-[#D98C95]/10 border-[#D98C95]' : 'bg-[#1E1B1B] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">Instant UPI Payment</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">Pay via GPay, PhonePe, or Paytm</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#D98C95]' : 'border-gray-600'}`}>
                    {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-[#D98C95]" />}
                  </div>
                </div>

                {/* COD Option */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center gap-3 ${
                    paymentMethod === 'cod' ? 'bg-[#D98C95]/10 border-[#D98C95]' : 'bg-[#1E1B1B] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">Cash / UPI on Delivery</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">Pay at your doorstep when it arrives</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#D98C95]' : 'border-gray-600'}`}>
                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#D98C95]" />}
                  </div>
                </div>
              </div>

              {/* Hidden submit trigger inside order summary button below */}
              <button id="hidden-submit-btn" type="submit" className="hidden" />
            </form>
          </div>

          {/* COLUMN 3: ORDER SUMMARY SIDEBAR */}
          <div className="bg-[#2A2525] rounded-[25px] p-5 sm:p-6 border border-gray-800 shadow-xl flex flex-col gap-5 sm:gap-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-[#D98C95] border-b border-gray-800 pb-3">
              📋 Order Summary
            </h2>

            {/* Product Miniature List */}
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {DUMMY_CHECKOUT_ITEMS.map((item) => (
                <div key={item.id} className="flex gap-3 items-center bg-[#1E1B1B] p-3 rounded-xl border border-gray-800/40">
                  <div className="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty}</p>
                  </div>
                  <p className="text-xs font-semibold text-[#D98C95] flex-shrink-0">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="flex flex-col gap-3 text-sm border-t border-b border-gray-800 py-4 my-1">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F7F3F0] mt-1">
                <span>Grand Total</span>
                <span className="text-[#D98C95]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Master Complete Button */}
            <button 
              onClick={() => document.getElementById('hidden-submit-btn').click()}
              className="w-full bg-[#D98C95] text-black font-bold py-3.5 rounded-full hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-center shadow-lg text-sm"
            >
              Confirm & Place Order (₹{grandTotal})
            </button>
            
            <p className="text-[10px] text-gray-500 text-center">
              🛡️ Secure encrypted transaction by AADSHI.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;