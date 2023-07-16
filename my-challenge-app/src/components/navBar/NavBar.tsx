import { NavLink, To } from 'react-router-dom'
import ChevronLeft from './ChevronLeft'
import IconTrash from './IconTrash'
import IconShoppingCart from './IconShoppingCart'
import classes from './NavBar.module.css'

const NavBar = (props: {
  link: To,
  link2: To 
}) => {
  const isShoppingCart = false;
  return (
    <nav className={classes.wrapper}>
      <NavLink to={props.link}>
        <ChevronLeft />
      </NavLink>
      <p className={classes.navTitle}>Search</p>
      <NavLink to={props.link2}>
        {isShoppingCart ? 
        <IconTrash /> :
        <IconShoppingCart />}
      </NavLink>
    </nav>
  );
}

export default NavBar
