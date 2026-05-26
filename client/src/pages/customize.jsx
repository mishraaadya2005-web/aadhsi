import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Customize() {
  const flowers = [
    { id: 1, name: "Rose 🌹", price: 50 },
    { id: 2, name: "Tulip 🌷", price: 60 },
    { id: 3, name: "Sunflower 🌻", price: 70 },
    { id: 4, name: "Daisy 🌸", price: 40 }
  ];

  const smallFlowers = [
    { id: 101, name: "Baby Breath 🤍", price: 20 },
    { id: 102, name: "Mini Daisy 🌼", price: 25 },
    { id: 103, name: "Pink Fill 🌸", price: 20 }
  ];

  const toys = [
    "No Toy",
    "Teddy 🧸",
    "Winnie 🐻",
    "Bunny 🐰"
  ];

  const wrappers = [
    "White Wrap",
    "Black Luxury",
    "Pink Soft",
    "Transparent"
  ];

  const accessories = [
    "✨ Pearls",
    "🎀 Ribbon",
    "💡 Fairy Lights"
  ];

  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedSmallFlowers, setSelectedSmallFlowers] = useState([]);
  const [selectedToy, setSelectedToy] = useState("");
  const [selectedWrapper, setSelectedWrapper] = useState("");
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [message, setMessage] = useState("");

  function toggleFlower(flower) {
    const exists = selectedFlowers.some(item => item.id === flower.id);

    exists
      ? setSelectedFlowers(selectedFlowers.filter(item => item.id !== flower.id))
      : setSelectedFlowers([...selectedFlowers, flower]);
  }

  function toggleSmallFlower(flower) {
    const exists = selectedSmallFlowers.some(item => item.id === flower.id);

    exists
      ? setSelectedSmallFlowers(selectedSmallFlowers.filter(item => item.id !== flower.id))
      : setSelectedSmallFlowers([...selectedSmallFlowers, flower]);
  }

  function toggleAccessory(item) {
    selectedAccessories.includes(item)
      ? setSelectedAccessories(selectedAccessories.filter(acc => acc !== item))
      : setSelectedAccessories([...selectedAccessories, item]);
  }

  const totalPrice =
    499 +
    selectedFlowers.length * 50 +
    selectedSmallFlowers.length * 20 +
    selectedAccessories.length * 30;

  return (
    <>
      <Navbar />

      <section className="bg-[#1E1B1B] min-h-screen px-[5%] py-10 text-white">
        <div className="mb-10">
          <p className="text-[#D98C95]">Build Your Bouquet ✨</p>
          <h1 className="text-6xl">Customize Bouquet</h1>
        </div>

        <div className="grid lg:grid-cols-[40%_60%] gap-8">
          {/* LIVE PREVIEW */}
          <div className="bg-[#2A2525] p-8 rounded-[35px] sticky top-20 h-fit">
            <h2 className="text-3xl mb-6">Live Preview</h2>

            <div className="bg-[#1E1B1B] rounded-[25px] p-8">
              <p className="text-[#D98C95]">Wrapping</p>
              <p className="mb-6">{selectedWrapper || "None"}</p>

              <p className="text-[#D98C95]">Flowers</p>
              <div className="flex flex-wrap gap-3 mb-6 mt-3">
                {selectedFlowers.map((flower) => (
                  <div
                    key={flower.id}
                    className="group bg-[#2A2525] px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
                  >
                    {flower.name}
                    <button
                      onClick={() =>
                        setSelectedFlowers(
                          selectedFlowers.filter((item) => item.id !== flower.id)
                        )
                      }
                      className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-red-500 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-[#D98C95]">Small Flowers</p>
              <div className="flex gap-2 flex-wrap mb-6 mt-3">
                {selectedSmallFlowers.map((flower) => (
                  <div key={flower.id} className="bg-[#2A2525] px-3 py-2 rounded-full">
                    {flower.name}
                  </div>
                ))}
              </div>

              <p className="text-[#D98C95]">Toy</p>
              <p className="mb-6">{selectedToy || "None"}</p>

              <p className="text-[#D98C95]">Message</p>
              <p className="mb-6 text-gray-300">{message || "No message"}</p>

              <p className="text-[#D98C95]">Estimated Price</p>
              <h2 className="text-4xl">₹{totalPrice}</h2>
            </div>
          </div>

          {/* CUSTOMIZATION */}
          <div className="bg-[#2A2525] p-8 rounded-[35px]">
            <h2 className="text-2xl mb-4">Choose Flowers</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {flowers.map((flower) => (
                <button
                  key={flower.id}
                  onClick={() => toggleFlower(flower)}
                  className={`p-5 rounded-[25px] transition hover:scale-105 ${
                    selectedFlowers.some((item) => item.id === flower.id)
                      ? "bg-[#D98C95]"
                      : "bg-[#1E1B1B]"
                  }`}
                >
                  {flower.name}
                </button>
              ))}
            </div>

            <h2 className="text-2xl mb-4">Small Flowers</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {smallFlowers.map((flower) => (
                <button
                  key={flower.id}
                  onClick={() => toggleSmallFlower(flower)}
                  className="bg-[#1E1B1B] p-5 rounded-[25px]"
                >
                  {flower.name}
                </button>
              ))}
            </div>

            <h2 className="text-2xl mb-4">Wrapping</h2>
            <div className="flex gap-4 flex-wrap mb-8">
              {wrappers.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedWrapper(item)}
                  className={`px-6 py-4 rounded-full ${
                    selectedWrapper === item ? "bg-[#D98C95]" : "bg-[#1E1B1B]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <h2 className="text-2xl mb-4">Choose Toy</h2>
            <div className="flex gap-4 flex-wrap mb-8">
              {toys.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedToy(item)}
                  className={`px-6 py-4 rounded-full ${
                    selectedToy === item ? "bg-[#D98C95]" : "bg-[#1E1B1B]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <h2 className="text-2xl mb-4">Accessories</h2>
            <div className="flex gap-4 flex-wrap mb-8">
              {accessories.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleAccessory(item)}
                  className="bg-[#1E1B1B] px-5 py-4 rounded-full"
                >
                  {item}
                </button>
              ))}
            </div>

            <h2 className="text-2xl mb-4">Gift Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full h-32 bg-[#1E1B1B] rounded-[25px] p-5 outline-none"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Customize;