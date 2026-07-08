import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Reviews from "../components/Reviews";
import CustomizeCTA from "../components/CustomizeCTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Reviews />
      <CustomizeCTA />
      <Footer />
    </>
  );
}

export default Home;