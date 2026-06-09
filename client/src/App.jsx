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

function App() {
  return (
    
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/customize"
          element={<Customize />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    
  );
}

export default App;