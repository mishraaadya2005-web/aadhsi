import React from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Temporary details state schema mockup card
  const product = {
    id: id,
    name: "Handcrafted Premium Bouquet",
    price: 499,
    image: "https://placehold.co/500x500",
    category: "Bouquets",
    stock: 1,
    description: "Beautifully woven crochet item crafted precisely with luxury fibers. A soft, vibrant keepsake item designed to remain perfect over time."
  };

  return (
    <div className="w-full min-h-screen bg-[#1E1B1B] text-[#F7F3F0] flex flex-col justify-between">
      <section className="max-w-4xl w-full mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left column side - Product Presentation Layout Asset */}
        <div className="w-full md:w-1/2 aspect-square rounded-[30px] bg-gray-900 overflow-hidden border border-gray-800 shadow-xl">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Right column side - Informational Card Text Plate */}
        <div className="w-full md:w-1/2 space-y-5">
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#D98C95] transition">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
          
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-[#D98C95] uppercase font-mono">{product.category}</span>
            <h1 className="text-3xl font-serif font-bold text-white">{product.name}</h1>
            <p className="text-[#D98C95] text-2xl font-semibold font-mono">₹{product.price}</p>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto px-8 py-3.5 bg-[#D98C95] text-[#1E1B1B] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#c57781] transition shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <ShoppingBag size={14} /> Add to Bag
          </button>
        </div>

      </section>
      <Footer />
    </div>
  );
}

export default ProductDetails;
