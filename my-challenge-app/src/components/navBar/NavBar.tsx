//React
import { MouseEventHandler, useContext } from 'react'
//React Router Dom
import { Link, To } from 'react-router-dom'
//Context
import { CartContext } from '../../store/CartContext'
//Components
import ChevronLeft from './ChevronLeft'
import IconTrash from './IconTrash'
import IconShoppingCart from './IconShoppingCart'
//CSS
import classes from './NavBar.module.css'

const NavBar = (props: {
  link: To,
  link2: To, 
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined
  title: string
  isShoppingCart: boolean
}) => {
  const { cartItems } = useContext(CartContext);
  const isShoppingCart = props.isShoppingCart;
  return (
    <nav className={classes.wrapper}>
      <Link to={props.link}>
        <ChevronLeft />
      </Link>
      <p className={classes.navTitle}>{props.title}</p>
      <Link 
        to={props.link2} 
        onClick={props.onClick}
      >
        {isShoppingCart ? 
        <IconTrash 
          iconWidth={'24'}
          iconHeight={'24'} 
          color={'#000000'}        
        /> :
        <div className={classes.iconCart}>
          <IconShoppingCart />
          {cartItems.length > 0 && 
          <div className={classes.cartControl}>
            <p>{cartItems.length}</p>
          </div>}
        </div>}
      </Link>
    </nav>
  );
}

export default NavBar
