//Hooks
import { useContext } from "react";
//Context
import { CartContext } from "../../store/CartContext";
//Components
import Button from "../../components/button/Button";
import ProceedtoCheckout from "../../components/button/ProceedtoCheckout";
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem";
import IconShoppingBag from "../../components/iconShoppingBag/IconShoppingBag";
//CSS
import classes from "./ShoppingCart.module.css";
import { NavLink } from "react-router-dom";

const ShoppingCart = () => {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);

  const handleClick = () => {
    const currentPurchaseOrdersJson = localStorage.getItem("purchaseOrders");
    let currentPurchaseOrders = currentPurchaseOrdersJson
      ? JSON.parse(currentPurchaseOrdersJson)
      : [];
    currentPurchaseOrders = [cartItems, ...currentPurchaseOrders];
    localStorage.setItem(
      "purchaseOrders",
      JSON.stringify(currentPurchaseOrders)
    );
    clearCart();
  };

  const handleDelete = () => {
    clearCart()
  };

  console.log(cartItems.length)
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
            <NavLink to={"/products"}>Shop Now</NavLink>
          </li>
        )}
      </ul>
      <span className={classes.wrapperText}>
        <p className={classes.textTotal}>Total {cartItems.length} Items</p>
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
