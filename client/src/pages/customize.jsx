import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { saveCustomBouquet } from "../services/customize";
import { getCurrentUser } from "../services/auth";
function Customize() {
  const flowers = [
    { id: 1, name: "Rose", price: 50, image: "/bouquet_assets/flowers/flower1.png" },
    { id: 2, name: "Tulip", price: 60, image: "/bouquet_assets/flowers/flower2.png" },
    { id: 3, name: "Sunflower", price: 70, image: "/bouquet_assets/flowers/flower3.png" },
    { id: 4, name: "Daisy", price: 40, image: "/bouquet_assets/flowers/flower4.png" }
  ];

  const smallFlowers = [
    { id: 101, name: "Baby Breath", price: 20, image: "/bouquet_assets/smallflowers/smallflower1.png" },
    { id: 102, name: "Mini Daisy", price: 25, image: "/bouquet_assets/smallflowers/smallflower2.png" },
    { id: 103, name: "Pink Fill", price: 20, image: "/bouquet_assets/smallflowers/smallflower3.png" }
  ];

  const toys = [
    { id: 1, name: "Teddy", image: "/bouquet_assets/toys/toy1.png" },
    { id: 2, name: "Winnie", image: "/bouquet_assets/toys/toy2.png" },
    { id: 3, name: "Bunny", image: "/bouquet_assets/toys/toy3.png" }
  ];

  const wrappers = [
    { id: 1, name: "White Wrap", image: "/bouquet_assets/wrappers/wrapper1.png" },
    { id: 2, name: "Black Luxury", image: "/bouquet_assets/wrappers/wrapper2.png" },
    { id: 3, name: "Pink Soft", image: "/bouquet_assets/wrappers/wrapper3.png" }
  ];

  const [selectedFlowers, setSelectedFlowers] = useState({});
  const [selectedSmallFlowers, setSelectedSmallFlowers] = useState({});
  const [selectedToy, setSelectedToy] = useState(null);
  const [selectedWrapper, setSelectedWrapper] = useState(null);  
  const [message, setMessage] = useState("");
    const handleSaveBouquet = async () => {

      const user = await getCurrentUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const bouquetData = {
        selected_flowers: selectedFlowers,
        selected_small_flowers: selectedSmallFlowers,
        wrapper: selectedWrapper?.name || null,
        toy: selectedToy?.name || null,
        gift_message: message,
        total_price: totalPrice,
        user_id: user.id,
      };

      const success = await saveCustomBouquet(bouquetData);

      if (success) {
        alert("Bouquet saved successfully");
      } else {
        alert("Failed to save bouquet");
      }
    };
  // Guarded Increment/Decrement logic to stop count overflow past constraints
  const handleQuantityChange = (id, delta, isSmall = false) => {
    const prevItems = isSmall ? selectedSmallFlowers : selectedFlowers;
    const limit = isSmall ? 4 : 5;
    
    // Calculate current total across all items in this group
    const currentTotalCount = Object.values(prevItems).reduce((sum, q) => sum + q, 0);

    // If attempting to increment (+) past max allowed capacity, reject the action
    if (delta > 0 && currentTotalCount >= limit) return;

    const setFunc = isSmall ? setSelectedSmallFlowers : setSelectedFlowers;
    setFunc((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const renderedFlowers = Object.entries(selectedFlowers).flatMap(([id, qty]) => 
    Array(qty).fill(flowers.find(f => f.id === parseInt(id)))
  );

  const renderedSmallFlowers = Object.entries(selectedSmallFlowers).flatMap(([id, qty]) => 
    Array(qty).fill(smallFlowers.find(f => f.id === parseInt(id)))
  );

  const handleRefresh = () => {
    setSelectedFlowers({});
    setSelectedSmallFlowers({});
    setSelectedToy(null);
    setSelectedWrapper(null);
    setMessage("");
  };

  const flowersCost = Object.entries(selectedFlowers).reduce((acc, [id, qty]) => acc + (flowers.find(f => f.id === parseInt(id))?.price || 0) * qty, 0);
  const smallFlowersCost = Object.entries(selectedSmallFlowers).reduce((acc, [id, qty]) => acc + (smallFlowers.find(f => f.id === parseInt(id))?.price || 0) * qty, 0);
  const totalPrice = 499 + flowersCost + smallFlowersCost;

  const mainFlowerSlots = [
    { left: "50%", top: "40%", scale: "w-[80px] lg:w-[125px]", rotate: "rotate-0", zIndex: "z-22" },       
    { left: "36%", top: "46%", scale: "w-[75px] lg:w-[115px]", rotate: "-rotate-12", zIndex: "z-24" },    
    { left: "64%", top: "46%", scale: "w-[75px] lg:w-[115px]", rotate: "rotate-12", zIndex: "z-24" },     
    { left: "46%", top: "51%", scale: "w-[85px] lg:w-[130px]", rotate: "rotate-3", zIndex: "z-30" },      
    { left: "56%", top: "50%", scale: "w-[80px] lg:w-[125px]", rotate: "-rotate-6", zIndex: "z-28" }      
  ];

  const fillerSlots = [
    { left: "28%", top: "43%", scale: "80px", zIndex: "z-26" },  
    { left: "72%", top: "43%", scale: "80px", zIndex: "z-26" },  
    { left: "41%", top: "54%", scale: "70px", zIndex: "z-32" },  
    { left: "59%", top: "55%", scale: "70px", zIndex: "z-32" }   
  ];
  
  return (
    <>
      <Navbar />

      <section className="bg-[#1E1B1B] min-h-screen px-[5%] py-10 text-white">
        <div className="mb-10">
          <p className="text-[#D98C95] font-medium tracking-wide">Build Your Bouquet ✨</p>
          <h1 className="text-4xl lg:text-6xl font-serif mt-1">Customize Bouquet</h1>
        </div>

        <div className="grid lg:grid-cols-[40%_60%] gap-8">
          
          {/* LIVE PREVIEW CONTAINER */}
          <div className="order-2 lg:order-1 bg-[#2A2525] p-5 lg:p-8 rounded-[35px] lg:sticky lg:top-20 h-fit shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-serif">Live Preview</h2>
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-[#1E1B1B] hover:bg-[#D98C95] hover:text-black font-medium text-sm text-[#D98C95] py-2 px-4 rounded-xl transition-all duration-300 border border-[#383232] hover:border-transparent active:scale-95"
              >
                🔄 Reset
              </button>
            </div>

            <div className="bg-[#1E1B1B] rounded-[25px] p-4">
              <div className="relative h-[380px] lg:h-[70vh] rounded-[20px] bg-[#151313] overflow-hidden">

                {/* Layer 1: Wrapper */}
                {selectedWrapper && (
                  <img
                    src={selectedWrapper.image}
                    alt=""
                    className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-[270px] lg:w-[420px] z-10 select-none pointer-events-none mix-blend-lighten"
                  />
                )}

                {/* Layer 2: Small Fillers */}
                {renderedSmallFlowers.slice(0, 4).map((flower, index) => {
                  if (!flower) return null;
                  const slot = fillerSlots[index];
                  return (
                    <img
                      key={`small-render-${index}`}
                      src={flower.image}
                      alt=""
                      className={`absolute ${slot.zIndex} select-none pointer-events-none drop-shadow-lg`}
                      style={{
                        width: slot.scale,
                        left: slot.left,
                        top: slot.top,
                        transform: "translate(-50%, -50%)"
                      }}
                    />
                  );
                })}

                {/* Layer 3: Main Showcase Flowers */}
                {renderedFlowers.slice(0, 5).map((flower, index) => {
                  if (!flower) return null;
                  const slot = mainFlowerSlots[index];
                  return (
                    <img
                      key={`main-render-${index}`}
                      src={flower.image}
                      alt=""
                      className={`absolute ${slot.zIndex} ${slot.scale} ${slot.rotate} transition-all duration-500 ease-out select-none pointer-events-none drop-shadow-xl`}
                      style={{
                        left: slot.left,
                        top: slot.top,
                        transform: "translate(-50%, -50%)"
                      }}
                    />
                  );
                })}

                {/* Layer 4: Plush Toy */}
                {selectedToy && (
                  <img
                    src={selectedToy.image}
                    alt=""
                    className="absolute left-1/2 top-[56%] -translate-x-1/2 w-26 lg:w-[130px] z-40 select-none pointer-events-none drop-shadow-2xl"
                  />
                )}

              </div>

              <div className="mt-6 flex justify-between items-end border-t border-[#2A2525] pt-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#D98C95]">Estimated Balance</p>
                  <h2 className="text-4xl font-serif mt-1 text-[#D98C95]">₹{totalPrice}</h2>
                </div>
                <span className="text-xs text-zinc-500 font-mono">Premium wrapping setup inc.</span>
              </div>

            </div>
          </div>

          {/* CUSTOMIZATION PANEL */}
          <div className="order-1 lg:order-2 bg-[#2A2525] p-5 lg:p-8 rounded-[35px] shadow-sm">

            <h2 className="text-xl font-serif mb-4 text-[#D98C95]">1. Premium Wrapping Base</h2>
            <div className="flex gap-4 flex-wrap mb-8">
              {wrappers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedWrapper(item)}
                  className={`cursor-pointer rounded-[20px] p-3 transition-all duration-300 border-2 ${selectedWrapper?.id === item.id ? "bg-[#332b2c] border-[#D98C95] scale-105" : "bg-[#1E1B1B] border-transparent hover:border-zinc-700"}`}
                >
                  <img src={item.image} alt={item.name} className="h-24 mx-auto object-contain" />
                </div>
              ))}
            </div>
            
            <h2 className="text-xl font-serif mb-4 text-[#D98C95]">2. Bouquet Main Stems <span className="text-xs text-zinc-400 font-sans font-normal ml-1">(Max 5 total)</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {flowers.map((flower) => {
                const qty = selectedFlowers[flower.id] || 0;
                return (
                  <div key={flower.id} className={`rounded-[22px] p-4 flex flex-col justify-between items-center transition-all duration-300 border ${qty > 0 ? "bg-[#1E1B1B] border-[#D98C95] shadow-md shadow-[#d98c9510]" : "bg-[#1E1B1B] border-zinc-800"}`}>
                    <img src={flower.image} alt={flower.name} className="h-16 object-contain mb-4 transition-transform duration-300 hover:scale-110" />
                    
                    <div className={`flex items-center justify-between rounded-xl px-1 py-1 text-white w-full border transition-all ${qty > 0 ? "bg-[#D98C95] border-[#D98C95]" : "bg-[#151313] border-zinc-800"}`}>
                      <button 
                        onClick={() => handleQuantityChange(flower.id, -1)} 
                        className={`font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${qty > 0 ? "text-black hover:bg-white/30" : "text-zinc-500 hover:text-white"}`}
                      >
                        -
                      </button>
                      <span className={`text-sm font-bold font-mono px-1 ${qty > 0 ? "text-black" : "text-[#D98C95]"}`}>{qty}</span>
                      <button 
                        onClick={() => handleQuantityChange(flower.id, 1)} 
                        className={`font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${qty > 0 ? "text-black hover:bg-white/30" : "text-zinc-500 hover:text-white"}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="text-xl font-serif mb-4 text-[#D98C95]">3. Structural Fillers & Foliage <span className="text-xs text-zinc-400 font-sans font-normal ml-1">(Max 4 total)</span></h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {smallFlowers.map((flower) => {
                const qty = selectedSmallFlowers[flower.id] || 0;
                return (
                  <div key={flower.id} className={`rounded-[22px] p-4 flex flex-col justify-between items-center transition-all duration-300 border ${qty > 0 ? "bg-[#1E1B1B] border-[#D98C95] shadow-md" : "bg-[#1E1B1B] border-zinc-800"}`}>
                    <img src={flower.image} alt={flower.name} className="h-12 object-contain mb-4 transition-transform duration-300 hover:scale-110" />
                    
                    <div className={`flex items-center justify-between rounded-xl px-1 py-1 text-white w-full border transition-all ${qty > 0 ? "bg-[#D98C95] border-[#D98C95]" : "bg-[#151313] border-zinc-800"}`}>
                      <button 
                        onClick={() => handleQuantityChange(flower.id, -1, true)} 
                        className={`font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${qty > 0 ? "text-black hover:bg-white/30" : "text-zinc-500 hover:text-white"}`}
                      >
                        -
                      </button>
                      <span className={`text-sm font-bold font-mono px-1 ${qty > 0 ? "text-black" : "text-[#D98C95]"}`}>{qty}</span>
                      <button 
                        onClick={() => handleQuantityChange(flower.id, 1, true)} 
                        className={`font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${qty > 0 ? "text-black hover:bg-white/30" : "text-zinc-500 hover:text-white"}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="text-xl font-serif mb-4 text-[#D98C95]">4. Nestled Center Keepsake</h2>
            <div className="flex gap-4 flex-wrap mb-8">
              {toys.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedToy(item)}
                  className={`p-3 rounded-full transition-all duration-300 border-2 ${selectedToy?.id === item.id ? "bg-[#332b2c] border-[#D98C95] scale-105 shadow-md" : "bg-[#1E1B1B] border-transparent hover:border-zinc-700"}`}
                >
                  <img src={item.image} alt={item.name} className="h-14 w-14 object-contain" />
                </button>
              ))}
            </div>

            <h2 className="text-xl font-serif mb-4 text-[#D98C95]">5. Elegant Gift Card Letter</h2>
            <textarea
              
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Inscribe your personal message here..."
              className="w-full h-28 bg-[#1E1B1B] rounded-[20px] p-4 outline-none resize-none border border-zinc-800 focus:border-[#D98C95] transition-all text-sm text-zinc-200 shadow-inner"
              
            />
          </div>
        </div>
      </section>
      
        <section className="px-6 py-12 bg-[#1E1B1B]">        
          <h2 className="font-serif text-5xl text-[#F7F3F0] text-center mb-10">
          Previous AADSHI Creations ✨
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="h-80 rounded-3xl bg-[#2A2525] border border-[#3A3434] flex items-center justify-center">
            <span className="text-[#D98C95] text-lg">
              Bouquet Photo 1
            </span>
          </div>

          <div className="h-80 rounded-3xl bg-[#2A2525] border border-[#3A3434] flex items-center justify-center">
            <span className="text-[#D98C95] text-lg">
              Bouquet Photo 2
            </span>
          </div>

          <div className="h-80 rounded-3xl bg-[#2A2525] border border-[#3A3434] flex items-center justify-center">
            <span className="text-[#D98C95] text-lg">
              Bouquet Photo 3
            </span>
          </div>

          <div className="h-80 rounded-3xl bg-[#2A2525] border border-[#3A3434] flex items-center justify-center">
            <span className="text-[#D98C95] text-lg">
              Bouquet Photo 4
            </span>
          </div>

        </div>

        <p className="text-center text-[#B8A9A9] mt-8 max-w-3xl mx-auto">
          Every bouquet is handmade and customized individually.
          These photographs showcase previous AADSHI creations and serve
          as inspiration. Your final bouquet will be crafted uniquely
          according to your selected flowers, wrapping and toy selection.
        </p>
        <button
          onClick={handleSaveBouquet}
          className="mt-6 bg-[#D98C95] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all"
        >
          Save Bouquet
        </button>
      </section>
      

<Footer />
      
    </>
  );
}

export default Customize;

