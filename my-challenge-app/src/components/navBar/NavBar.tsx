import { NavLink, To } from 'react-router-dom'
import ChevronLeft from './ChevronLeft'
import IconTrash from './IconTrash'
import IconShoppingCart from './IconShoppingCart'
import classes from './NavBar.module.css'

const NavBar = (props: {
  link: To,
  link2: To, 
  title: string
  isShoppingCart: boolean
}) => {
  const isShoppingCart = props.isShoppingCart;
  return (
    <nav className={classes.wrapper}>
      <NavLink to={props.link}>
        <ChevronLeft />
      </NavLink>
      <p className={classes.navTitle}>{props.title}</p>
      <NavLink to={props.link2}>
        {isShoppingCart ? 
        <IconTrash 
          iconWidth={'24'} 
          iconHeight={'24'} 
        /> :
        <IconShoppingCart />}
      </NavLink>
    </nav>
  );
}

export default NavBar
