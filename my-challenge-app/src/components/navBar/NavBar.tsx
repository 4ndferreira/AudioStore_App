import ChevronLeft from './ChevronLeft'
import IconTrash from './IconTrash'
import IconShoppingCart from './IconShoppingCart'
import classes from './NavBar.module.css'

const NavBar = () => {
  const isShoppingCart = false;
  return (
    <nav className={classes.wrapper}>
      <ChevronLeft />
      <p className={classes.navTitle}>Search</p>
      {isShoppingCart ? 
      <IconTrash /> :
      <IconShoppingCart />}
    </nav>
  );
}

export default NavBar
