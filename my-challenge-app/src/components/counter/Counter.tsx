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
        <p
          className={classes.button} 
          onClick={handleDecrease}
        >
          <IconMinus />
        </p>
        <p>{count}</p>
        <p
          className={classes.button}
          onClick={handleIncrease}
        > 
          <IconPlus />
        </p>
      </div>
        <p onClick={() => setCount(0)}>
          <IconTrash />
        </p>
    </div>
  );
}

export default Count