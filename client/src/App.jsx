import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; 

import Home from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/productdetails";
import Customize from "./pages/customize";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Wishlist from "./pages/wishlist";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Admin from "./pages/admin"; 

function App() {
  const location = useLocation();

  // Define route paths that should NOT include the regular storefront sidebar layout
  const standalonePages = ["/admin", "/login", "/signup"];
  const isStandalone = standalonePages.includes(location.pathname.toLowerCase());

  // Conditional Architecture Wrapper
  if (isStandalone) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1E1B1B]">
      
      {/* Persistent Left Sidebar / Mobile Header Drawer */}
      <Navbar />

      {/* Dynamic Main Storefront Content Viewport Window */}
      <main className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />      
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;