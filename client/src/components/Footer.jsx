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
    <footer className="w-full bg-[#2A2525]/40 border border-gray-800/40 rounded-[24px] px-6 py-6 lg:py-8 mt-8 text-[#F7F3F0] transition-all duration-300">
      
      {/* Compressed Grid Layout Matrix */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-2.5">
          <div>
            <p className="text-[#D98C95] text-[10px] font-bold uppercase tracking-wider">Made with love ✨</p>
            <h2 className="text-2xl font-bold tracking-wider font-serif text-white">AADSHI</h2>
          </div>
          <p className="text-[#B8B0AC] leading-relaxed text-[11px] max-w-xs">
            Handmade gifts crafted with warmth, creativity and personalized moments.
          </p>
          <a 
            href="https://www.instagram.com/aadshi.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#D98C95] hover:bg-[#D98C95]/10 border border-[#D98C95]/20 bg-[#1E1B1B] px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            📸 Follow us @aadshi
          </a>
        </div>

        {/* Column 2: Shop Links */}
        <div className="lg:mx-auto">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#D98C95] mb-2.5 font-mono">Shop</h3>
          <ul className="space-y-1.5 text-[11px] text-[#B8B0AC] font-medium">
            <li><Link to="/shop" className="hover:text-white transition-colors block">Crochet Bouquets</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors block">Keychains</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors block">Gift Combos</Link></li>
            <li><Link to="/customize" className="hover:text-white transition-colors block">Custom Gifts</Link></li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="lg:mx-auto">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#D98C95] mb-2.5 font-mono">Quick Links</h3>
          <ul className="space-y-1.5 text-[11px] text-[#B8B0AC] font-medium">
            <li><Link to="/" className="hover:text-white transition-colors block">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors block">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors block">Cart</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors block">Contact</Link></li>
          </ul>
        </div>

      </div>

      {/* Mini Bottom Credits & Subtle Staff Link Bar */}
      <div className="w-full mt-6 pt-4 border-t border-gray-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] text-[#8A8481] font-mono uppercase tracking-wider">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} AADSHI • Handmade with love 🌸
        </p>

        {/* Subtle touch-friendly Admin Link */}
        <Link 
          to="/admin" 
          className="text-[#5A5452] hover:text-[#D98C95] transition-colors py-1.5 px-3 rounded-lg active:scale-95"
        >
          Staff Access
        </Link>
      </div>
    </footer>
  );
}

export default Footer;