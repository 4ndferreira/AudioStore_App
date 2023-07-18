import Button from "../../components/button/Button";
import ProceedtoCheckout from "../../components/button/ProceedtoCheckout";
import NavBar from "../../components/navBar/NavBar";
import SearchItem from "../../components/searchItem/SearchItem";
import classes from './ShoppingCart.module.css'

const ShoppingCart = () => {
  const handleClick = () => {
    throw new Error("Function not implemented.");
  }
  return (
    <div>
      <NavBar 
        link={'/'}
        link2={''}
        title={'Shopping Cart'} 
        isShoppingCart={true}      
      />
      <SearchItem 
        name={""} 
        price={""} 
        rating={0} 
        isShoppingCart={true} 
      />
      <div className={classes.wrapperButton}>
        <Button 
          type={"button"} 
          onClick={handleClick} 
          name={<ProceedtoCheckout/>} 
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
