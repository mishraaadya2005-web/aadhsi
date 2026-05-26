import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Shop from "./pages/shop";
import ProductDetails from "./pages/productdetails";
import Customize from "./pages/customize";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;