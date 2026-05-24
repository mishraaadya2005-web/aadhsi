import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import CustomizeCTA from "./components/CustomizeCTA";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CustomizeCTA />
      <Reviews />
      <Footer />
    </>
  );
}

export default App;