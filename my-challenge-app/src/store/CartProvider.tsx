//React
import { ReactNode, useEffect, useState } from "react";
//Firebase
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/Config";
//Context
import { CartContext, Item } from "./CartContext";
//UseFetch
import { Data } from "../hooks/useFetch";

const CartProvider = (props: { children: ReactNode }) => {
  const [userID, setUserID] = useState<string | undefined>(undefined);
  const [cartItems, setCartItems] = useState<Item[]>([]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      user && setUserID(user.uid)
    })
  }, [])

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
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        count: 1,
      };
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
    const setFireStoreCart = async () => {
      if(userID) {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return updateDoc(docRef, { cart: [...cartItems] });
        } else {
          return setDoc(docRef, { cart: [...cartItems] });
        }
      }
    }
    void setFireStoreCart();
  }, [cartItems, userID]);

  useEffect(()=>{
    const getFireStoreCart = async () => {
      if(userID) {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const cartFirestore: Item[] = docSnap.data().cart
          setCartItems(cartFirestore)
        } else {
          setCartItems([])
        }
      }
    }
    void getFireStoreCart();
  }, [userID]);

  const cartItemCount = cartItems.reduce((acc, item) => (acc += item.count), 0);

  const cartContext = {
    cartItems,
    addToCart,
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    cartItemCount
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;