import { MouseEventHandler, useContext } from "react";
import { CartContext } from "../../store/CartContext";
//Router
import { NavLink } from "react-router-dom";
//Icons
import IconLogout from "../header/IconLogout";
import IconShoppingCart from "../navBar/IconShoppingCart";
import GridIcon from "./GridIcon";
//CSS
import classes from "./Sidebar.module.css";
import { motion } from "framer-motion";

const SideBar = (props: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  const { cartItemCount } = useContext(CartContext);
  return (
    <div className={classes.page}>
      <motion.nav
        initial={{ width: 0 }}
        animate={{ width: "50%", transition: { duration: 0.3 } }}
        exit={{ x: 0 }}
        className={classes.sidebar}
      >
        <NavLink className={classes.menuLink} to={"/products"}>
          <GridIcon />
          <span>Products</span>
        </NavLink>
        <NavLink className={classes.menuLink} to={"/cart"}>
          <span className={classes.iconCart}>
            <IconShoppingCart />
            <div className={classes.cartControl}>
              <p>{cartItemCount}</p>
            </div>
          </span>
          <span>Cart</span>
        </NavLink>
        <button className={classes.buttonLogout} onClick={props.onClick}>
          <IconLogout />
          <span>Logout</span>
        </button>
      </motion.nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0 }}
        className={classes.pageOverlay}
      ></motion.div>
    </div>
  );
};

export default SideBar;
