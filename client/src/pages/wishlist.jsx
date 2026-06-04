import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Rose Crochet Bouquet",
      price: 499,
      image: "https://placehold.co/300x300",
    },
    {
      id: 2,
      name: "Tulip Bouquet",
      price: 599,
      image: "https://placehold.co/300x300",
    },
  ];

  return (
    <div className="bg-[#141010] min-h-screen text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-[#D98C95] text-lg mb-2">
          Your Favorites ❤️
        </p>

        <h1 className="font-serif text-6xl mb-12">
          Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart
              size={70}
              className="mx-auto mb-6 text-[#D98C95]"
            />

            <h2 className="text-3xl font-semibold mb-4">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-400">
              Save your favorite bouquets here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#241D1D] rounded-3xl overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.name}
                  </h3>

                  <p className="text-[#D98C95] text-xl mb-5">
                    ₹{item.price}
                  </p>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#D98C95] text-white py-3 rounded-full flex items-center justify-center gap-2">
                      <ShoppingCart size={18} />
                      Add
                    </button>

                    <button className="p-3 rounded-full bg-[#1B1717]">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Wishlist;