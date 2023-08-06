//React
import { useContext } from "react";
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

const ShoppingCart = () => {
  const { cartItems, clearCart, getCartTotal, cartItemCount } = useContext(CartContext);
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
    // try {
    //   const docRef = await addDoc(collection(db, "orders"), { order });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };

  const handleDelete = () => {
    clearCart()
  };

  return (
    <div className={classes.container}>
      <NavBar
        link={"/products"}
        link2={""}
        title={"Shopping Cart"}
        onClick={handleDelete}
        isShoppingCart={true}
      />
      <ul className={classes.cartItemsList}>
        {cartItems.length !== 0 ? (
          cartItems.map((item) => (
            <SearchItem
              key={item.id}
              name={item.name}
              price={item.price}
              rating={0}
              isShoppingCart={true}
              count={item.count}
              itemId={item.id}
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
