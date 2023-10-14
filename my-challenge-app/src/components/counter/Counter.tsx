//Hooks
import { useContext, useRef } from "react";
//Components
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";
import IconTrash from "../navBar/IconTrash";
import { CartContext } from "../../store/CartContext";
//CSS
import classes from './Counter.module.css'

const Count = (props: {
  itemId: number;
  count: number;
  showModal: () => void;
  onItemDelete(itemId: number): void;
}) => {
  const { increaseCartItem, decreaseCartItem, removeFromCart, cartItemCount } = useContext(CartContext)
  const counterRef = useRef(props.count)

  const handleIncrease = () => {
    increaseCartItem(props.itemId)
    counterRef.current = (props.count + 1)
}
  const handleDecrease = () => {
    if (counterRef.current > 1){
      decreaseCartItem(props.itemId)
      counterRef.current = (props.count - 1)
    }else{
      props.showModal()
      props.onItemDelete(props.itemId);
    }
  }

  const handleDelete = () => {
    removeFromCart(props.itemId)
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.counter}>
        <button
          className={classes.button} 
          type='button'
          onClick={handleDecrease}
        >
          <IconMinus />
        </button>
        <p>{counterRef.current}</p>
        <button
          className={classes.button}
          type='button'
          onClick={handleIncrease}
        > 
          <IconPlus />
        </button>
      </div>
        <button 
          className={classes.buttonDelete}
          type='button'
          onClick={handleDelete}
        >
          <IconTrash 
            iconWidth={'20'}
            iconHeight={'20'} 
            color={"#7F7F7F"}          
          />
        </button>
    </div>
  );
}

export default Count