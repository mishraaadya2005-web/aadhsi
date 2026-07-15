import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/", icon: "🏠" },
    { name: "SHOP", path: "/shop", icon: "🧶" },
    { name: "CUSTOMIZE", path: "/customize", icon: "💝" },
    { name: "WISHLIST", path: "/wishlist", icon: "♡" },
    { name: "CART", path: "/cart", icon: "🛒" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 📱 MOBILE ONLY TOP UTILITY BAR */}
      <nav className="md:hidden sticky top-0 z-40 px-4 py-4 backdrop-blur-md bg-[#1E1B1B]/80 border-b border-[#2A2525] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="bg-[#2A2525] text-[#F7F3F0] w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#D98C95] hover:text-black transition-all active:scale-95 cursor-pointer"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          <Link to="/">
            <h2 className="text-2xl text-[#D98C95] font-bold tracking-wide font-serif">
              AADSHI
            </h2>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <Link to="/cart">
            <button className="bg-[#D98C95] text-black font-extrabold px-4 py-2 rounded-full text-xs uppercase tracking-wider transition active:scale-98 cursor-pointer">
              Cart 🛒
            </button>
          </Link>
        </div>
      </nav>

      {/* 🗂️ MAIN NAVIGATION SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#1E1B1B] z-50 flex transition-all duration-300 ease-in-out shadow-2xl 
          ${isOpen ? "w-[280px] sm:w-[320px] translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-68 md:sticky md:block md:z-30`}
      >
        {/* INNER CONTAINER PANEL */}
        <div className="w-full h-full bg-[#1E1B1B] border-r border-gray-900/40 flex flex-col py-8 overflow-y-auto overflow-x-hidden">
          <div>
            
            {/* BRAND LOGO IDENTITY SECTION */}
            <div className="px-6 mb-10 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
                <div className="w-12 h-12 rounded-full bg-[#F7F3F0] flex items-center justify-center overflow-hidden border border-[#D98C95]/40 shadow-md group-hover:scale-102 transition duration-300 flex-shrink-0">
                  <span className="text-lg">🌸</span>
                </div>
                <h2 className="text-4xl text-[#D98C95] font-bold tracking-wide font-serif">
                  AADSHI
                </h2>
              </Link>

              {/* Mobile Drawer Close Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden bg-[#2A2525] w-8 h-8 rounded-full flex items-center justify-center border border-gray-800 text-gray-400 hover:text-white cursor-pointer active:scale-90 transition-transform"
              >
                ✕
              </button>
            </div>

            {/* HIGH FIDELITY NAVIGATION ROUTING LINKS */}
            <nav className="flex flex-col pl-4 pr-0 gap-1 relative">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="relative group block"
                  >
                    <div
                      className={`flex items-center gap-4 px-6 py-4 rounded-l-full text-xs font-bold tracking-widest transition-all duration-200 uppercase
                        ${isActive
                          ? "bg-[#F7F3F0] text-black shadow-lg translate-x-1"
                          : "text-gray-400 hover:text-[#F7F3F0] hover:translate-x-1"
                        }`}
                    >
                      <span className="text-base flex-shrink-0">{link.icon}</span>
                      <span>{link.name}</span>
                    </div>

                    {isActive && (
                      <div className="absolute right-0 top-0 h-full w-1 bg-[#D98C95]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 🌫️ MOBILE SHIELD OVERLAY */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden"
        />
      )}
    </>
  );
}

export default Navbar;