//React
import { useContext } from 'react'
//React Router Dom
import { To, useNavigate } from 'react-router-dom'
//Context
import { CartContext } from '../../store/CartContext'
//Components
import ChevronLeft from '../icons/ChevronLeft'
import IconTrash from '../icons/IconTrash'
import IconShoppingCart from '../icons/IconShoppingCart'
//CSS
import classes from './NavBar.module.css'

const NavBar = (props: {
  link: To, 
  title: string
  isShoppingCart: boolean
}) => {
  const { cartItemCount, clearCart } = useContext(CartContext);
  const isShoppingCart = props.isShoppingCart;
  const navigate = useNavigate()

  const GoToHome = () => {
    navigate(props.link, {state: {isPush: true}})
  };

  const GoForward = () => {
    isShoppingCart ? clearCart() : navigate('/cart')
  };

  return (
    <nav className={classes.wrapper}>
      <button className={classes.buttonGoBack} onClick={GoToHome}>
        <ChevronLeft />
      </button>
      <p className={classes.navTitle}>{props.title}</p>
      <button className={classes.buttonGoBack} onClick={GoForward}>
        {isShoppingCart ? 
        <IconTrash 
          iconWidth={'24'}
          iconHeight={'24'} 
          color={'#000000'}        
        /> :
        <div className={classes.iconCart}>
          <IconShoppingCart />
          {cartItemCount > 0 && 
          <div className={classes.cartControl}>
            <p>{cartItemCount}</p>
          </div>}
        </div>}
      </button>
    </nav>
  );
}

export default NavBar
