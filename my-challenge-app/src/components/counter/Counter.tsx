import { useState } from "react";
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";
import IconTrash from "../navBar/IconTrash";
import classes from './Counter.module.css'

const Count = () => {
  const [count, setCount] = useState(1)

  const handleIncrease = () => {
    setCount(count => count + 1)
  }
  const handleDecrease = () => {
    count > 1 && setCount(count => count - 1)
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
        <p>{count}</p>
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
          onClick={() => setCount(0)}
        >
          <IconTrash 
            iconWidth={'20'} 
            iconHeight={'20'} 
          />
        </button>
    </div>
  );
}

export default Count