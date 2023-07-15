import { useState } from "react";
import IconMinus from "./IconMinus";
import IconPlus from "./IconPlus";
import classes from './Counter.module.css'

const Count = () => {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count => count + 1)
  }
  const handleDecrease = () => {
    count > 0 && setCount(count => count - 1)
  }

  return (
    <div className={classes.wrapper}>
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
  );
}

export default Count