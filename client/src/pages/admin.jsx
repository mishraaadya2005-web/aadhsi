import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase'; 

function Admin() {
  // --- LOGIN SECURITY STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- NAVIGATION STATE ---
  // Options: 'dashboard', 'products', 'orders', 'custom-requests', 'settings'
  const [currentScreen, setCurrentScreen] = useState('dashboard');

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

  // --- FETCH RELEVANT TABLES ON LOAD ---
  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminData();
    }
  }, [isLoggedIn]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch products catalog
      const prodRes = await supabase.from('products').select('*');
      if (prodRes.error) throw prodRes.error;
      setProducts(prodRes.data || []);

      // 2. Fetch custom bouquet entries
      const custRes = await supabase.from('custom_bouquets').select('*');
      if (custRes.error) throw custRes.error;
      setCustomRequests(custRes.data || []);
    } catch (err) {
      console.error("Database fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- ADD PRODUCT TO SUPABASE ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('products').insert([
        {
          name: prodName,
          category: prodCategory,
          price: parseFloat(prodPrice),
          description: prodDesc,
          image: prodImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=500",
          stock: parseInt(prodStock) || 0,
          customizable: isCustomizable === 'Yes',
          featured: isFeatured === 'Yes'
        }
      ]);

      if (error) throw error;
      alert(`🎉 "${prodName}" successfully pushed live!`);
      
      // Clear all inputs
      setProdName(''); setProdPrice(''); setProdDesc(''); setProdImage(''); setProdStock('');
      fetchAdminData(); // Refresh list automatically
    } catch (err) {
      alert("Error saving item: " + err.message);
    }
  };

  // --- DELETE A LIVE PRODUCT ---
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

  // --- PROTECTION VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1E1B1B] flex items-center justify-center p-4">
        <div className="bg-[#2A2525] p-8 rounded-[25px] border border-gray-800 shadow-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-[#D98C95] mb-2">AADSHI</h2>
          <p className="text-sm text-gray-400 mb-6">Authorized Admin Portal</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] text-sm" required />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] px-4 py-3 rounded-xl border border-gray-800 focus:outline-none focus:border-[#D98C95] text-sm" required />
            {loginError && <p className="text-rose-500 text-xs">{loginError}</p>}
            <button type="submit" className="bg-[#D98C95] text-black font-bold py-3 rounded-full mt-2 hover:opacity-90 transition-opacity text-sm">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#1E1B1B] text-[#F7F3F0]">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-64 bg-[#2A2525] p-6 border-r border-gray-800 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#D98C95] mb-8">AADSHI Admin</h2>
          <nav className="flex flex-col gap-2">
            <button onClick={() => setCurrentScreen('dashboard')} className={`w-full text-left p-3 rounded-xl text-xs font-semibold ${currentScreen === 'dashboard' ? 'bg-[#D98C95] text-black' : 'hover:bg-[#1E1B1B]'}`}>📊 Dashboard Overview</button>
            <button onClick={() => setCurrentScreen('products')} className={`w-full text-left p-3 rounded-xl text-xs font-semibold ${currentScreen === 'products' ? 'bg-[#D98C95] text-black' : 'hover:bg-[#1E1B1B]'}`}>🧶 Products & Stock</button>
            <button onClick={() => setCurrentScreen('custom-requests')} className={`w-full text-left p-3 rounded-xl text-xs font-semibold ${currentScreen === 'custom-requests' ? 'bg-[#D98C95] text-black' : 'hover:bg-[#1E1B1B]'}`}>💝 Custom Requests</button>
            <button onClick={() => setCurrentScreen('settings')} className={`w-full text-left p-3 rounded-xl text-xs font-semibold ${currentScreen === 'settings' ? 'bg-[#D98C95] text-black' : 'hover:bg-[#1E1B1B]'}`}>⚙️ Shop Settings</button>
          </nav>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-xs text-rose-400 border border-rose-900/40 py-2 rounded-xl hover:bg-rose-950/20">Logout</button>
      </div>

      {/* WORKSPACE AREA */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {/* SCREEN 1: METRICS DASHBOARD OVERVIEW */}
        {currentScreen === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#2A2525] p-6 rounded-[25px] border border-gray-800 shadow-md">
                <p className="text-gray-400 text-xs uppercase font-bold">📦 Total Orders</p>
                <p className="text-2xl font-bold text-[#D98C95] mt-2">42</p>
              </div>
              <div className="bg-[#2A2525] p-6 rounded-[25px] border border-gray-800 shadow-md">
                <p className="text-gray-400 text-xs uppercase font-bold">💰 Total Revenue</p>
                <p className="text-2xl font-bold text-[#D98C95] mt-2">₹18,500</p>
              </div>
              <div className="bg-[#2A2525] p-6 rounded-[25px] border border-gray-800 shadow-md">
                <p className="text-gray-400 text-xs uppercase font-bold">⏳ Pending</p>
                <p className="text-2xl font-bold text-amber-400 mt-2">7</p>
              </div>
              <div className="bg-[#2A2525] p-6 rounded-[25px] border border-gray-800 shadow-md">
                <p className="text-gray-400 text-xs uppercase font-bold">🧶 Total Products</p>
                <p className="text-2xl font-bold text-emerald-400 mt-2">{products.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: PRODUCTS MANAGEMENT */}
        {currentScreen === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-1 bg-[#2A2525] p-6 rounded-[25px] border border-gray-800 shadow-lg flex flex-col gap-4">
              <h2 className="text-lg font-bold text-[#D98C95]">Add New Item</h2>
              <form onSubmit={handleAddProduct} className="flex flex-col gap-3 text-xs">
                <input type="text" placeholder="Product Name" value={prodName} onChange={e => setProdName(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" required />
                <select value={prodCategory} onChange={e => setProdCategory(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none cursor-pointer">
                  <option value="Bouquets">Bouquets</option>
                  <option value="Custom Bouquets">Custom Bouquets</option>
                  <option value="Keychains">Keychains</option>
                  <option value="Gift Combos">Gift Combos</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Price (₹)" value={prodPrice} onChange={e => setProdPrice(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" required />
                  <input type="number" placeholder="Stock Qty" value={prodStock} onChange={e => setProdStock(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" required />
                </div>
                <textarea rows="2" placeholder="Item Description..." value={prodDesc} onChange={e => setProdDesc(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none resize-none" />
                <input type="text" placeholder="Paste Image URL" value={prodImage} onChange={e => setProdImage(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" />
                
                <div className="grid grid-cols-2 gap-3 bg-[#1E1B1B] p-3 rounded-xl border border-gray-800/50">
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Customizable?</label>
                    <select value={isCustomizable} onChange={e => setIsCustomizable(e.target.value)} className="bg-[#2A2525] w-full p-1 rounded focus:outline-none">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 block mb-1">Feature Item?</label>
                    <select value={isFeatured} onChange={e => setIsFeatured(e.target.value)} className="bg-[#2A2525] w-full p-1 rounded focus:outline-none">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="bg-[#D98C95] text-black font-bold py-2.5 rounded-full mt-2 hover:scale-[1.01] active:scale-[0.99] transition-transform text-sm">+ Add Product</button>
              </form>
            </div>

            {/* Catalog List Column */}
            <div className="lg:col-span-2 bg-[#2A2525] p-6 rounded-[25px] border border-gray-800 shadow-lg">
              <h2 className="text-lg font-bold text-[#D98C95] mb-4">Current Catalog Rows</h2>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-[#D98C95]">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Stock</th>
                      <th className="pb-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/30">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-[#1E1B1B]/30">
                        <td className="py-3 font-medium">{p.name}</td>
                        <td className="py-3">₹{p.price}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${p.stock > 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                            {p.stock > 0 ? `${p.stock} Units` : 'Sold Out'}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button onClick={() => handleDeleteProduct(p.id)} className="text-rose-400 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: CUSTOM BOUQUET REQUESTS */}
        {currentScreen === 'custom-requests' && (
          <div>
            <h1 className="text-3xl font-bold mb-2">Custom Bouquet Submissions</h1>
            <p className="text-gray-400 text-xs mb-8">Live configurations loaded straight from Aadya's custom builder database rows.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customRequests.map(req => (
                <div key={req.id} className="bg-[#2A2525] rounded-[25px] p-6 border border-gray-800 flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[10px] text-[#D98C95] bg-[#1E1B1B] px-3 py-1 rounded-full border border-gray-800">REQ-{req.id}</span>
                      <span className="capitalize font-bold text-[#F7F3F0]">Status: {req.order_status || 'Pending'}</span>
                    </div>
                    <div className="bg-[#1E1B1B] p-4 rounded-xl border border-gray-800/50 flex flex-col gap-1 text-gray-300">
                      <p><span className="text-gray-500 font-medium">Wrapper:</span> {req.wrapper || 'Standard'}</p>
                      <p><span className="text-gray-500 font-medium">Selected Assembly:</span> {req.selected_flowers ? JSON.stringify(req.selected_flowers) : 'Standard Mixed'}</p>
                      <p><span className="text-gray-500 font-medium">Toys Add-on:</span> {req.toy || 'None'}</p>
                    </div>
                    {req.gift_message && (
                      <p className="mt-3 p-2 bg-[#D98C95]/5 border border-[#D98C95]/10 rounded-lg text-gray-400 italic">"{req.gift_message}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 4: STORE SETTINGS */}
        {currentScreen === 'settings' && (
          <div className="max-w-xl bg-[#2A2525] p-8 rounded-[25px] border border-gray-800 shadow-xl">
            <h1 className="text-2xl font-bold text-[#D98C95] mb-6">Business Core Settings</h1>
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-gray-400">Business Name</label>
                <input type="text" value={bizName} onChange={e => setBizName(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-400">Instagram Handle Link</label>
                <input type="text" value={instaLink} placeholder="https://instagram.com/aadshi" onChange={e => setInstaLink(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400">WhatsApp Contact Number</label>
                  <input type="text" value={waNumber} placeholder="e.g., +91..." onChange={e => setWaNumber(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400">Standard Local Delivery Charge (₹)</label>
                  <input type="number" value={shipCharges} onChange={e => setShipCharges(e.target.value)} className="bg-[#1E1B1B] text-[#F7F3F0] p-3 rounded-xl border border-gray-800 focus:outline-none" />
                </div>
              </div>
              <button onClick={() => alert("Settings configuration saved locally! ⚙️")} className="bg-[#D98C95] text-black font-bold py-2.5 rounded-full mt-4 text-sm hover:scale-[1.01] transition-transform">Save Configurations</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;