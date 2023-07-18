import { createContext, useState } from "react";

export const CardContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updateItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem }
        }
        return cartItem;
      })
      setCartItems(updateItems);
    } else {
      const newItem = {...item};
      setCartItems([...cartItems, newItem]);
    }
  } 
  const removeFromCart = (itemId) =>
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <CardContext.Provider value={cartContextValue}>
      {children}
    </CardContext.Provider>
  );
};

export default CartProvider;