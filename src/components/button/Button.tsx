import { MouseEventHandler } from 'react';
import classes from './Button.module.css'

const Button = (props: {
  type: 'button' | 'submit';
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string | React.ReactNode
}) => {
  return (
    <button 
      className={classes.button}
      type={props.type} 
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
