import { MouseEventHandler } from 'react';
import classes from './Button.module.css'

const Button = (props: {
  type: 'button' | 'submit';
  onClick: MouseEventHandler<HTMLButtonElement>;
  name: string | JSX.Element
}) => {
  return (
    <button 
      className={classes.button}
      type={props.type} 
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
