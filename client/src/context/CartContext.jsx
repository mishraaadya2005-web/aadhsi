import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Read initial cart layout map right out of browser storage if active
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('aadshi_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Keep browser storage synced up automatically on state modification events
  useEffect(() => {
    localStorage.setItem('aadshi_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Method 1: Inject Selected item straight into data state row array maps
  const addToCart = (product, requestedQty = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + requestedQty }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: requestedQty }];
    });
  };

  // Method 2: Adjust individual target inventory tracking rows up or down
  const updateQuantity = (productId, changeDelta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + changeDelta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Auto-evict items dropping below 1
    );
  };

  // Method 3: Instant deletion clear operations control hook
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook helper shortcut for cleaner structural page layouts
export const useCart = () => useContext(CartContext);