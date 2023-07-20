import { ReactNode, useEffect, useState } from "react";
import { CartContext, Item } from "./CartContext";
import { Data } from "../hooks/useFetch";

const CartProvider = (props: { children: ReactNode }) => {
  const cartLocalStorage = localStorage.getItem('cartItems');
  const parsedCartItems: Item[] = cartLocalStorage ? JSON.parse(cartLocalStorage) : []
  const [cartItems, setCartItems] = useState<Item[]>(parsedCartItems);

  const addToCart = (item: Data) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updateItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, count: cartItem.count +1 }
        }
        return cartItem;
      })
      setCartItems(updateItems);
    } else {
      const newItem = {...item, count: 1};
      setCartItems([...cartItems, newItem]);
    }
  }
  
  const increaseCartItem = (itemId: number) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        return { ...cartItem, count: cartItem.count +1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseCartItem = (itemId: number) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        return { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (itemId: number) =>
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

  const clearCart = () => setCartItems([])

  const getCartTotal = () => {
    const total = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.count,
      0.00
    );
    return total.toFixed(2);
  };

  useEffect(()=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(()=>{
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      const parsedCartItems: Item[] = JSON.parse(cartItems) 
      setCartItems(parsedCartItems);
    }
  }, []);

  const cartContext = {
    cartItems,
    addToCart,
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;