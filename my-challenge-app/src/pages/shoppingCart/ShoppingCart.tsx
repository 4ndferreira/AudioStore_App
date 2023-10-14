//React
import { SetStateAction, useContext, useState } from "react";
//React Router Dom
import { Link } from "react-router-dom";
//Firebase
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Config";
//UUID
import { v4 as uuidv4 } from 'uuid'
//Context
import { CartContext } from "../../store/CartContext";
//Components
import Button from "../../components/button/Button";
import ProceedtoCheckout from "../../components/button/ProceedtoCheckout";
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem";
import IconShoppingBag from "../../components/iconShoppingBag/IconShoppingBag";
//CSS
import classes from './ShoppingCart.module.css'
import DeletionDialogBox from "../../components/deletionDialogBox/DeletionDialogBox";

const ShoppingCart = () => {
  const { cartItems, clearCart, getCartTotal, cartItemCount } = useContext(CartContext);
  const [ isOpen, setIsOpen ] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const userID = auth.currentUser?.uid;
  
  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price.replace("$", ""),
      quantities: item.count,
    }));
    const order = {
      id: uuidv4() ,
      date: new Date().toISOString(), 
      totalItems: cartItemCount,
      totalPrice: getCartTotal(),
      items: orderItems
    };
    if(userID) {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          return updateDoc(docRef, { orders: arrayUnion(order) });
        } else {
          return setDoc(docRef, { orders: [order] });
        }
    }
    clearCart();
  };

  const handleItemDelete = (itemId: number) => {
    setSelectedItemId(itemId);
  }

  console.log(isOpen)

  return (
    <div className={classes.container}>
      <NavBar
        link={"/products"}
        link2={""}
        title={"Shopping Cart"}
        onClick={() => clearCart()}
        isShoppingCart={true}
      />
      {isOpen && 
      <DeletionDialogBox 
        isOpen={isOpen}
        itemId={selectedItemId} 
        onClose={() => setIsOpen(false)}       
      />}
      <ul className={classes.cartItemsList}>
        {cartItems.length !== 0 ? (
          cartItems.map((item) => (
            <SearchItem
              key={item.id}
              name={item.name}
              price={item.price}
              rating={0}
              isShoppingCart={true}
              itemId={item.id}
              count={item.count}            
              showModal={() => setIsOpen(true)}
              onItemDelete={handleItemDelete} 
            />
          ))
        ) : (
          <li className={classes.alertCart}>
            <IconShoppingBag 
              width={"96"} 
              height={"96"} 
              color={"#0ACF83"} 
            />
            <p>Your Cart is Empty</p>
            <Link to={"/products"}>Shop Now</Link>
          </li>
        )}
      </ul>
      <span className={classes.wrapperText}>
        <p className={classes.textTotal}>Total {cartItemCount} Items</p>
        <p className={classes.textPrice}>USD {getCartTotal()}</p>
      </span>
      <div className={classes.wrapperButton}>
        <Button
          type={"button"}
          onClick={handleClick}
          name={<ProceedtoCheckout />}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
