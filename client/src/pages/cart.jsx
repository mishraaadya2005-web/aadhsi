import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Cart() {
  const testCart = async () => {
    const result = await addToCart({
      product_id: 1,
      quantity: 2
    });

    console.log(result);
  };
  
  const cartItems = [
    {
      id: 1,
      name: "Rose Crochet Bouquet",
      price: 499,
      quantity: 1,
      image: "https://placehold.co/120x120",
    },
    {
      id: 2,
      name: "Tulip Bouquet",
      price: 599,
      quantity: 1,
      image: "https://placehold.co/120x120",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const delivery = 99;
  const total = subtotal + delivery;

  return (
    <>
      <Navbar />

      <section className="bg-[#1E1B1B] min-h-screen text-[#F7F3F0] px-[5%] py-12">
        <p className="text-[#D98C95] mb-2">
          Shopping Bag ✨
        </p>

        <h1 className="text-6xl mb-12">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🛒</div>

            <h2 className="text-4xl mb-4">
              Your Cart is Empty
            </h2>

            <p className="text-gray-400 mb-8">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/shop"
              className="bg-[#D98C95] px-8 py-4 rounded-full"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2A2525] rounded-[30px] p-5 flex flex-col md:flex-row gap-5"
                >
                  <div className="w-full md:w-[140px] h-[140px] bg-gray-300 rounded-[20px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl mb-2">
                        {item.name}
                      </h3>

                      <p className="text-[#D98C95] text-xl">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-[#1E1B1B]">
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button className="w-10 h-10 rounded-full bg-[#1E1B1B]">
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button className="text-red-400 hover:text-red-300">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="bg-[#2A2525] rounded-[30px] p-8 sticky top-28">
                <h2 className="text-3xl mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 text-lg">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{delivery}</span>
                  </div>

                  <hr className="border-[#433D3D]" />

                  <div className="flex justify-between text-2xl font-semibold">
                    <span>Total</span>
                    <span className="text-[#D98C95]">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-8">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="w-full bg-[#1E1B1B] p-4 rounded-full outline-none"
                  />
                </div>

                <button className="w-full mt-6 bg-[#D98C95] text-white py-4 rounded-full text-lg hover:opacity-90 transition">
                  Proceed To Checkout
                </button>

                <Link
                  to="/shop"
                  className="block text-center mt-5 text-gray-400 hover:text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
        
      <Footer />
    </>
  );
}

export default Cart;