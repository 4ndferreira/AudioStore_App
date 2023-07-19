import { useContext } from "react";
import Button from "../../components/button/Button";
import ProceedtoCheckout from "../../components/button/ProceedtoCheckout";
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem";
import { CartContext } from "../../components/store/CartContext";
//CSS
import classes from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const handleClick = () => {
    throw new Error("Function not implemented.");
  };

  const handleDelete = () => {
    clearCart()
  };

  console.log(cartItems)
  return (
    <div className={classes.container}>
      <NavBar
        link={"/"}
        link2={""}
        title={"Shopping Cart"}
        isShoppingCart={true}
        onClick={handleDelete}
      />
      <ul className={classes.cartItemsList}>
        {cartItems.map((item) => (
          <SearchItem
            key={item.id}
            name={item.name}
            price={item.price}
            rating={0}
            isShoppingCart={true}
            count={item.count}
            itemId={item.id}
          />
        ))}
      </ul>
      <span className={classes.wrapperText}>
        <p className={classes.textTotal}>
          Total {cartItems.length} Items
        </p> 
        <p className={classes.textPrice}>
          USD {getCartTotal()}
        </p>
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
