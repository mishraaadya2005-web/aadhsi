import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/productdetails";
import Customize from "./pages/customize";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Wishlist from "./pages/wishlist";
import Signup from "./pages/signup";
import Login from "./pages/login";
// 1. Added the Admin import here (matching your lowercase filename)
import Admin from "./pages/admin"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      
      {/* 2. Kept only ONE copy of product details route */}
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/customize" element={<Customize />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* 3. Added the brand new Admin URL path */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;