import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing! 🌸\nWe will send updates to: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#151313] px-[5%] py-16 text-[#F7F3F0] border-t border-[#2A2525]">
      
      {/* 1. FIXED THE GRID BALANCE: Using w-full and justified columns to fill the space perfectly */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand & Instagram */}
        <div>
          <p className="text-[#D98C95] mb-2 text-sm">Made with love ✨</p>
          <h2 className="text-4xl mb-4 font-bold tracking-wide">AADSHI</h2>
          <p className="text-[#B8B0AC] leading-7 text-sm mb-5">
            Handmade gifts crafted with warmth, creativity and personalized moments.
          </p>
          
          <a 
            href="https://www.instagram.com/aadshi.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#D98C95] hover:bg-[#D98C95]/10 border border-[#D98C95]/30 bg-[#2A2525] px-4 py-2 rounded-full transition-all"
          >
            📸 Follow us @aadshi
          </a>
        </div>

        {/* Shop Links - Centered better on desktop */}
        <div className="lg:mx-auto">
          <h3 className="text-xl mb-5 font-medium text-[#F7F3F0]">Shop</h3>
          <ul className="space-y-3 text-sm text-[#B8B0AC]">
            <li><Link to="/shop" className="hover:text-[#D98C95] transition-colors block">Crochet Bouquets</Link></li>
            <li><Link to="/shop" className="hover:text-[#D98C95] transition-colors block">Keychains</Link></li>
            <li><Link to="/shop" className="hover:text-[#D98C95] transition-colors block">Gift Combos</Link></li>
            <li><Link to="/customize" className="hover:text-[#D98C95] transition-colors block">Custom Gifts</Link></li>
          </ul>
        </div>

        {/* Quick Links - Centered better on desktop */}
        <div className="lg:mx-auto">
          <h3 className="text-xl mb-5 font-medium text-[#F7F3F0]">Quick Links</h3>
          <ul className="space-y-3 text-sm text-[#B8B0AC]">
            <li><Link to="/" className="hover:text-[#D98C95] transition-colors block">Home</Link></li>
            <li><Link to="/shop" className="hover:text-[#D98C95] transition-colors block">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-[#D98C95] transition-colors block">Cart</Link></li>
            <li><Link to="/" className="hover:text-[#D98C95] transition-colors block">Contact</Link></li>
          </ul>
        </div>

        {/* Subscribe Newsletter - Fills the right side cleanly */}
        <div>
          <h3 className="text-xl mb-5 font-medium text-[#F7F3F0]">Stay Connected</h3>
          <form onSubmit={handleNewsletterSubmit} className="bg-[#2A2525] rounded-full p-1.5 flex items-center w-full border border-gray-800/60 max-w-sm">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="bg-transparent flex-1 outline-none px-4 text-white text-sm min-w-0"
            />
            <button
              type="submit"
              className="bg-[#D98C95] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#c57781] transition-all text-xs flex-shrink-0"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Bottom bar */}
      <div>
        <hr className="my-10 border-[#2A2525]"/>
        <p className="text-center text-xs text-[#8A8481]">
          © 2026 AADSHI • Handmade with love 🌸
        </p>
      </div>
    </footer>
  );
}

export default Footer;