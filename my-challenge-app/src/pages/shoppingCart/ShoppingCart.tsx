import { useContext } from "react";
import Button from "../../components/button/Button";
import ProceedtoCheckout from "../../components/button/ProceedtoCheckout";
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem";
import { CardContext } from "../../components/CartProvider";
//CSS
import classes from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useContext(CardContext);
  const handleClick = () => {
    throw new Error("Function not implemented.");
  };
  return (
    <div>
      <NavBar
        link={"/"}
        link2={""}
        title={"Shopping Cart"}
        isShoppingCart={true}
      />
      <ul>
        {cartItems.map((item) => (
          <SearchItem 
            key={item.id}
            name={item.name}
            price={item.price} 
            rating={0} 
            isShoppingCart={true} 
          />
        ))}
      </ul>
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
