import { uploadProductImage } from '../services/cloudinary';
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase'; 

function Admin() {
  // --- LOGIN SECURITY STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- NAVIGATION STATE ---
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  // --- LIVE DATABASE STATES ---
  const [products, setProducts] = useState([]);
  const [customRequests, setCustomRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- FORM STATES FOR NEW PRODUCT ---
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Bouquets');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [isCustomizable, setIsCustomizable] = useState('Yes');
  const [isFeatured, setIsFeatured] = useState('No');

  // --- SETTINGS STATES ---
  const [bizName, setBizName] = useState('AADSHI');
  const [instaLink, setInstaLink] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [shipCharges, setShipCharges] = useState('60');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Navigation Items Config Array for Map Operations
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'products', label: 'Products & Stock', icon: '🧶' },
    { id: 'custom-requests', label: 'Custom Requests', icon: '💝' },
    { id: 'settings', label: 'Shop Settings', icon: '⚙️' }
  ];

  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminData();
    }
  }, [isLoggedIn]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const prodRes = await supabase.from('products').select('*');
      if (prodRes.error) throw prodRes.error;
      setProducts(prodRes.data || []);

      const custRes = await supabase.from('custom_bouquets').select('*');
      if (custRes.error) throw custRes.error;
      setCustomRequests(custRes.data || []);
    } catch (err) {
      console.error("Database fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('products').insert([
        {
          name: prodName,
          category: prodCategory,
          price: parseFloat(prodPrice),
          image: prodImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=500",
          stock: parseInt(prodStock) || 0,
          customizable: isCustomizable === 'Yes',
          featured: isFeatured === 'Yes'
        }
      ]);

      if (error) throw error;
      alert(`🎉 "${prodName}" successfully pushed live!`);
      
      setProdName(''); setProdPrice(''); setProdDesc(''); setProdImage(''); setProdStock('');
      fetchAdminData();
    } catch (err) {
      alert("Error saving item: " + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product row?")) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'aadshi123') {
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid Credentials!');
    }
  };

  // --- ARMED PROTECTION VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1E1B1B] flex items-center justify-center p-4 antialiased">
        <div className="bg-[#2A2525] p-6 sm:p-10 rounded-[30px] border border-gray-800/60 shadow-2xl w-full max-w-md text-center transform transition-all duration-300">
          <h2 className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-[#F0A6CA] to-[#D98C95] bg-clip-text text-transparent font-serif mb-2">AADSHI</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-8">Authorized Admin Portal</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <input 
              type="text" 
              placeholder="Username" 
              onChange={e => setUsername(e.target.value)} 
              className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] text-sm transition-all placeholder:text-gray-600" 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)} 
              className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] text-sm transition-all placeholder:text-gray-600" 
              required 
            />
            {loginError && <p className="text-rose-500 text-xs font-medium pl-1 animate-pulse">{loginError}</p>}
            <button type="submit" className="bg-[#D98C95] hover:bg-[#D98C95]/90 text-[#1E1B1B] font-bold py-3.5 rounded-xl mt-2 transition-all text-sm shadow-md active:scale-98 cursor-pointer text-center">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1E1B1B] text-[#F7F3F0] font-sans antialiased overflow-x-hidden">
      
      {/* 📱 MOBILE HEADER BAR (Glassmorphic & Sticky) */}
      <div className="md:hidden w-full flex items-center justify-between p-4 bg-[#2A2525]/90 backdrop-blur-md border-b border-gray-800/80 sticky top-0 z-50">
        <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#F0A6CA] to-[#D98C95] bg-clip-text text-transparent font-serif">
          AADSHI Admin
        </span>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="px-4 py-2 rounded-xl border border-gray-700 text-xs font-semibold bg-[#1E1B1B] hover:bg-[#2A2525] active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          ☰ Menu
        </button>
      </div>

      {/* 🗂️ SIDEBAR NAVIGATION DRAWER (Responsive Overlap Fixed View on Mobile, Pinned on Desktop) */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-68 bg-[#2A2525] border-r border-gray-800 p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex h-screen md:sticky md:top-0
      `}>
        <div>
          {/* Header & Mobile Close Control */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F0A6CA] to-[#D98C95] bg-clip-text text-transparent font-serif tracking-wide">
              AADSHI Admin
            </h2>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-xs font-semibold bg-[#1E1B1B] active:scale-90 transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Map Driven Nav Elements */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentScreen(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all duration-200 transform text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#D98C95] text-[#1E1B1B] shadow-md shadow-[#D98C95]/10 scale-[1.02]'
                      : 'text-gray-400 hover:bg-[#1E1B1B] hover:text-white hover:translate-x-1'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Bottom Block */}
        <button 
          onClick={() => setIsLoggedIn(false)} 
          className="text-xs text-rose-400 border border-rose-900/40 py-3 rounded-xl hover:bg-rose-950/20 active:scale-98 transition-all w-full cursor-pointer text-center font-medium mt-6 md:mt-0"
        >
          Logout Portal
        </button>
      </div>

      {/* 🌫️ MOBILE BLUR OVERLAY LAYER */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden"
        />
      )}

      {/* 📈 COMPONENT WORKSPACE AREA */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 lg:p-12 overflow-y-auto max-w-full space-y-8">
        
        {/* SCREEN 1: METRICS DASHBOARD OVERVIEW */}
        {currentScreen === 'dashboard' && (
          <div className="space-y-6 max-w-6xl animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold font-serif tracking-tight">Business Dashboard</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Real-time store activity & performance metrics</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="group relative bg-[#2A2525] p-6 rounded-[25px] border border-gray-800/60 shadow-md hover:bg-[#322c2c] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#D98C95]/2 blur-xl rounded-full group-hover:bg-[#D98C95]/5 transition-all" />
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider group-hover:text-gray-400 transition-colors">📦 Total Orders</p>
                <p className="text-3xl font-bold text-[#D98C95] mt-3 font-serif">42</p>
              </div>

              <div className="group relative bg-[#2A2525] p-6 rounded-[25px] border border-gray-800/60 shadow-md hover:bg-[#322c2c] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#D98C95]/2 blur-xl rounded-full group-hover:bg-[#D98C95]/5 transition-all" />
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider group-hover:text-gray-400 transition-colors">💰 Total Revenue</p>
                <p className="text-3xl font-bold text-[#D98C95] mt-3 font-serif">₹18,500</p>
              </div>

              <div className="group relative bg-[#2A2525] p-6 rounded-[25px] border border-gray-800/60 shadow-md hover:bg-[#322c2c] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/2 blur-xl rounded-full group-hover:bg-amber-400/5 transition-all" />
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider group-hover:text-gray-400 transition-colors">⏳ Pending Orders</p>
                <p className="text-3xl font-bold text-amber-400 mt-3 font-serif">7</p>
              </div>

              <div className="group relative bg-[#2A2525] p-6 rounded-[25px] border border-gray-800/60 shadow-md hover:bg-[#322c2c] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/2 blur-xl rounded-full group-hover:bg-emerald-400/5 transition-all" />
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider group-hover:text-gray-400 transition-colors">🧶 Active Products</p>
                <p className="text-3xl font-bold text-emerald-400 mt-3 font-serif">{products.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: PRODUCTS MANAGEMENT */}
        {currentScreen === 'products' && (
          <div className="space-y-6 max-w-7xl animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold font-serif tracking-tight">Products & Stock</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Add items or update your inventory catalog tables</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              
              {/* Product Add Input Form Frame */}
              <div className="lg:col-span-1 bg-[#2A2525] p-5 sm:p-6 rounded-[25px] border border-gray-800/60 shadow-lg flex flex-col gap-4">
                <h2 className="text-base font-bold text-[#D98C95] tracking-wide">Add New Product</h2>
                <form onSubmit={handleAddProduct} className="flex flex-col gap-3.5 text-xs">
                  <input type="text" placeholder="Product Name" value={prodName} onChange={e => setProdName(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" required />
                  
                  <select value={prodCategory} onChange={e => setProdCategory(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] cursor-pointer w-full appearance-none transition-all">
                    <option value="Bouquets">Bouquets</option>
                    <option value="Custom Bouquets">Custom Bouquets</option>
                    <option value="Keychains">Keychains</option>
                    <option value="Gift Combos">Gift Combos</option>
                  </select>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="Price (₹)" value={prodPrice} onChange={e => setProdPrice(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" required />
                    <input type="number" placeholder="Stock Qty" value={prodStock} onChange={e => setProdStock(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" required />
                  </div>
                  
                  <textarea rows="2" placeholder="Item Description..." value={prodDesc} onChange={e => setProdDesc(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] resize-none w-full transition-all" />
                  
                  {/* Cloudinary Upload Asset Block */}
                  <div className="flex flex-col gap-2 bg-[#1E1B1B] p-3.5 rounded-xl border border-gray-800/50">
                    <label className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">Product Image Asset</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-[11px] file:font-semibold file:bg-[#D98C95]/10 file:text-[#D98C95] hover:file:bg-[#D98C95]/20 cursor-pointer w-full overflow-hidden transition-all"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setUploadingImage(true);
                        try {
                          const uploadedUrl = await uploadProductImage(file);
                          setProdImage(uploadedUrl);
                          alert("Image uploaded to Cloudinary successfully! 📸");
                        } catch (err) {
                          alert("Image upload failed. Double check your upload preset name or cloud name setup.");
                        } finally {
                          setUploadingImage(false);
                        }
                      }}
                    />
                    {uploadingImage && <p className="text-[10px] text-[#D98C95] animate-pulse font-medium mt-1">Uploading assets to cloud...</p>}
                    {prodImage && !uploadingImage && (
                      <div className="mt-1 w-14 h-14 bg-[#2A2525] rounded-xl overflow-hidden border border-[#D98C95]/20 relative group">
                        <img src={prodImage} alt="Uploaded Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 bg-[#1E1B1B] p-3 rounded-xl border border-gray-800/50">
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-1">Customizable?</label>
                      <select value={isCustomizable} onChange={e => setIsCustomizable(e.target.value)} className="bg-[#2A2525] w-full p-1.5 rounded-lg border border-gray-800/60 focus:outline-none text-[#F7F3F0] text-[11px] cursor-pointer">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 font-semibold block mb-1">Feature Item?</label>
                      <select value={isFeatured} onChange={e => setIsFeatured(e.target.value)} className="bg-[#2A2525] w-full p-1.5 rounded-lg border border-gray-800/60 focus:outline-none text-[#F7F3F0] text-[11px] cursor-pointer">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="bg-[#D98C95] hover:bg-[#D98C95]/90 text-[#1E1B1B] font-bold py-3 rounded-xl mt-1 active:scale-[0.99] transition-all text-sm w-full cursor-pointer shadow-md text-center">
                    + Push Live Product
                  </button>
                </form>
              </div>

              {/* Responsive Catalog Table Interface */}
              <div className="lg:col-span-2 bg-[#2A2525] p-5 sm:p-6 rounded-[25px] border border-gray-800/60 shadow-lg overflow-hidden flex flex-col">
                <h2 className="text-base font-bold text-[#D98C95] mb-4 tracking-wide">Current Catalog</h2>
                <div className="overflow-x-auto text-xs whitespace-nowrap scrollbar-thin rounded-xl border border-gray-800/40">
                  <table className="w-full text-left border-collapse min-w-[550px]">
                    <thead>
                      <tr className="bg-[#1E1B1B] text-[#D98C95] border-b border-gray-800 font-bold">
                        <th className="p-3.5 pl-4">Product Details</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Pricing</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/40">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-[#1E1B1B]/40 transition-colors group">
                          <td className="p-3.5 pl-4 font-medium flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1E1B1B] border border-gray-800 overflow-hidden flex-shrink-0">
                              <img src={p.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="truncate max-w-[140px] text-white font-semibold">{p.name}</span>
                          </td>
                          <td className="p-3.5 text-gray-400 font-medium">{p.category}</td>
                          <td className="p-3.5 text-[#F7F3F0] font-semibold">₹{p.price}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${p.stock > 0 ? 'bg-emerald-950/60 border border-emerald-900/40 text-emerald-400' : 'bg-rose-950/60 border border-rose-900/40 text-rose-400'}`}>
                              {p.stock > 0 ? `${p.stock} Units` : 'Sold Out'}
                            </span>
                          </td>
                          <td className="p-3.5 pr-4 text-right">
                            <button 
                              onClick={() => handleDeleteProduct(p.id)} 
                              className="text-rose-400 hover:text-rose-300 font-medium transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-500 font-medium bg-[#1E1B1B]/10">No products configured inside database rows yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: CUSTOM BOUQUET REQUESTS */}
        {currentScreen === 'custom-requests' && (
          <div className="space-y-6 max-w-6xl animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold font-serif tracking-tight">Custom Bouquet Submissions</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Live configuration payloads generated from client builders</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {customRequests.map(req => (
                <div key={req.id} className="group relative bg-[#2A2525] rounded-[25px] p-5 sm:p-6 border border-gray-800/60 shadow-md hover:bg-[#2e2929] transition-all duration-300 flex flex-col justify-between text-xs gap-4 overflow-hidden">
                  <div>
                    <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
                      <span className="font-mono text-[10px] text-[#D98C95] bg-[#1E1B1B] px-3 py-1 rounded-xl border border-gray-800 font-bold">REQ-0{req.id}</span>
                      <span className="capitalize font-bold text-gray-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Status: {req.order_status || 'Pending'}
                      </span>
                    </div>
                    
                    <div className="bg-[#1E1B1B] p-4 rounded-xl border border-gray-800/50 flex flex-col gap-2 text-gray-300 break-words leading-relaxed shadow-inner">
                      <p><span className="text-gray-500 font-semibold uppercase text-[10px] tracking-wider block sm:inline mr-1">Wrapper Layer:</span> {req.wrapper || 'Standard'}</p>
                      <div>
                        <span className="text-gray-500 font-semibold uppercase text-[10px] tracking-wider block mb-1">Assembly Parameters:</span>
                        <code className="font-mono text-[11px] block bg-[#2A2525] p-2 rounded-lg border border-gray-800 text-[#D98C95] whitespace-pre-wrap overflow-x-auto">
                          {req.selected_flowers ? (typeof req.selected_flowers === 'string' ? req.selected_flowers : JSON.stringify(req.selected_flowers, null, 2)) : 'Standard Mixed Stems'}
                        </code>
                      </div>
                      <p><span className="text-gray-500 font-semibold uppercase text-[10px] tracking-wider block sm:inline mr-1">Plush Toy Add-on:</span> {req.toy || 'None'}</p>
                    </div>
                    
                    {req.gift_message && (
                      <div className="mt-4 p-3 bg-[#D98C95]/5 border border-[#D98C95]/10 rounded-xl relative">
                        <span className="absolute -top-2 left-3 bg-[#2A2525] px-1 text-[9px] uppercase font-bold text-gray-500 tracking-widest">Card Message</span>
                        <p className="text-gray-400 italic font-serif text-xs break-words pt-1">"{req.gift_message}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {customRequests.length === 0 && (
                <div className="col-span-1 md:col-span-2 border border-dashed border-gray-800 p-10 rounded-[25px] text-center text-sm text-gray-500 bg-[#2A2525]/20">
                  No custom builder requests loaded from active client sessions yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 4: STORE SETTINGS */}
        {currentScreen === 'settings' && (
          <div className="max-w-xl bg-[#2A2525] p-6 sm:p-8 rounded-[25px] border border-gray-800/60 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold font-serif tracking-tight text-[#D98C95]">Core Shop Settings</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Configure global store behavior, pricing hooks, and branding metadata</p>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-semibold">Store Brand Name</label>
                <input type="text" value={bizName} onChange={e => setBizName(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-semibold">Instagram Business Handler URL</label>
                <input type="text" value={instaLink} placeholder="https://instagram.com/aadshi" onChange={e => setInstaLink(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold">WhatsApp Business Gateway Line</label>
                  <input type="text" value={waNumber} placeholder="e.g., +91..." onChange={e => setWaNumber(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-semibold">Local Delivery Charge Fee (₹)</label>
                  <input type="number" value={shipCharges} onChange={e => setShipCharges(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] w-full transition-all" />
                </div>
              </div>
              
              <button 
                onClick={() => alert("Settings configuration saved locally! ⚙️")} 
                className="bg-[#D98C95] hover:bg-[#D98C95]/90 text-[#1E1B1B] font-bold py-3.5 rounded-xl mt-4 text-sm transition-all w-full cursor-pointer shadow-md shadow-[#D98C95]/5 text-center active:scale-98"
              >
                Save Configurations
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Admin;