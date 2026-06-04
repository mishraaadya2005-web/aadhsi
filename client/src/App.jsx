import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/productdetails";
import Customize from "./pages/customize";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <BrowserRouter>

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;