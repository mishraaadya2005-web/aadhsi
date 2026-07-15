import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-[#1E1B1B] min-h-screen px-[5%] py-20 flex flex-col md:flex-row items-center justify-between gap-16">
      
      {/* LEFT SIDE: COPYWRITING & CALLS TO ACTION */}
      <div className="max-w-xl">
        <p className="text-[#D98C95] text-lg mb-4">
          Handmade with love ✨
        </p>

        <h1 className="text-6xl md:text-8xl font-serif text-[#F7F3F0] leading-none mb-6">
          Personalized Gifts Made Just For You
        </h1>

        <p className="text-[#B8B0AC] text-lg leading-9">
          Crochet bouquets, customized gifts, keychains and handcrafted surprises
          designed for every special moment.
        </p>

        {/* INTERACTIVE ROUTING ACTION BUTTON FLEX TILES */}
        <div className="flex gap-5 mt-10">
          
          {/* Target Routing Point: Store Catalog */}
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#D98C95] text-[#1E1B1B] px-8 py-4 rounded-full font-extrabold hover:scale-105 hover:bg-[#c57781] transition-all cursor-pointer shadow-md"
          >
            Shop Now
          </Link>

          {/* Target Routing Point: Custom Product Studio */}
          <Link
            to="/customize"
            className="inline-flex items-center justify-center border border-[#D98C95] text-[#F7F3F0] px-8 py-4 rounded-full font-bold hover:bg-[#D98C95] hover:text-[#1E1B1B] hover:scale-105 transition-all cursor-pointer shadow-sm"
          >
            Customize Gift
          </Link>

        </div>
      </div>

      {/* RIGHT SIDE: GLASSMORPHIC PRODUCT HERO FRAME */}
      <div className="relative bg-[#2A2525]/40 border border-gray-800/40 p-6 rounded-[40px] shadow-2xl">
        
        {/* Decorative Radial Ambient Glow Plate */}
        <div className="absolute w-[250px] h-[250px] bg-[#D98C95] opacity-20 blur-[120px] top-10 left-10 pointer-events-none" />

        {/* Main Graphical Asset Element */}
        <img
          src="/hero-bouquet.png"
          alt="Premium Handmade Bouquet"
          className="relative z-10 w-[350px] md:w-[450px] rounded-[30px] hover:scale-102 transition duration-500 object-cover"
        />

      </div>

    </section>
  );
}

export default Hero;