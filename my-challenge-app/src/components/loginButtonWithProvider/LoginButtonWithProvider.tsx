import { MouseEventHandler } from "react";
import classes from './LoginButtonWithProvider.module.css'

const LoginButtonWithProvider = (props: {
  type: 'button' | 'submit';
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: JSX.Element
}) => {
  return (
    <button 
      className={classes.button}
      type={props.type} 
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}

export default LoginButtonWithProvider
