import { ReactNode, createContext } from "react";
import { Data } from "../hooks/useFetch";

export interface Item {
  id: number,
  name: string,
  price: string,
  count: number;
  category: string
}

interface CartContextValue {
  cartItems: Item[];
  addToCart: (item: Data) => void;
  increaseCartItem: (itemId: number) => void;
  decreaseCartItem: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  getCartTotal: () => ReactNode;
  cartItemCount: number
}

export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: (item: Data) => {
    throw new Error("Function not implemented.");
  },
  increaseCartItem: (itemId: number) => {
    throw new Error("Function not implemented.");
  },
  decreaseCartItem: (itemId: number) => {
    throw new Error("Function not implemented.");
  },
  removeFromCart: (itemId: number) => {
    throw new Error("Function not implemented.");
  },
  clearCart: () => {
    throw new Error("Function not implemented.");
  },
  getCartTotal: () => {
    throw new Error("Function not implemented.");
  },
  cartItemCount: 0
});
