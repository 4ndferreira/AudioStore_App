//React
import { MouseEventHandler, Ref, useContext } from "react";
//Framer motion
import { motion } from "framer-motion";
//Context
import { CartContext } from "../../store/CartContext";
//Router
import { NavLink } from "react-router-dom";
//Icons
import IconLogout from "../header/IconLogout";
import IconShoppingCart from "../navBar/IconShoppingCart";
import GridIcon from "./GridIcon";
import SearchIcon from "../labelInput/SearchIcon";
//CSS
import classes from "./Sidebar.module.css";

const menuVariants = {
  open: {
    x: 0,
    transition: {
      type: "tween"
    }
  },
  closed: {
    x: "-70vw",
    transition: {
      type: "tween"
    }
  }
};

const SideBar = (props: {
  menuRef: Ref<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLButtonElement> 
}) => {
  const { cartItemCount } = useContext(CartContext);
  return (
    <div className={classes.page}>
      <motion.nav
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className={classes.sidebar}
      >
        <ul className={classes.menuList}>
          <li>
            <NavLink 
              className={classes.menuLink} 
              to={"/products"}
            >
              <SearchIcon size={"25"} color={"black"} />
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              className={classes.menuLink} 
              to={"/products"}
            >
              <GridIcon />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              className={classes.menuLink} 
              to={"/cart"}
            >
              <span className={classes.iconCart}>
                <IconShoppingCart />
                <div className={classes.cartControl}>
                  <p>{cartItemCount}</p>
                </div>
              </span>
              <span>Cart</span>
            </NavLink>
          </li>
        </ul>
        <button 
          className={classes.buttonLogout} 
          onClick={props.onClick}
        >
          <IconLogout />
          <span>Logout</span>
        </button>      
      </motion.nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes.pageOverlay}
        ref={props.menuRef}
      />
    </div>
  );
};

export default SideBar;