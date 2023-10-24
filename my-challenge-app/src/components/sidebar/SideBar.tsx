//React
import { MouseEventHandler, Ref, useContext } from "react";
//Framer motion
import { motion } from "framer-motion";
//Context
import { CartContext } from "../../store/CartContext";
//Router
import { NavLink } from "react-router-dom";
//Icons
import IconLogout from "../icons/IconLogout";
import IconShoppingCart from "../icons/IconShoppingCart";
import GridIcon from "../icons/GridIcon";
import SearchIcon from "../icons/SearchIcon";
//CSS
import classes from "./Sidebar.module.css";

const menuVariants = {
  open: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.2
    }
  },
  closed: {
    x: "-70vw",
    transition: {
      type: "tween", 
      duration: 0.1
    }
  }
};

const SideBar = (props: {
  menuRef: Ref<HTMLDivElement>;
  logout: MouseEventHandler<HTMLButtonElement> 
  closeSidebar: MouseEventHandler<HTMLAnchorElement>
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
              to={"/search"}
              onClick={props.closeSidebar}
            >
              <SearchIcon size={"25"} color={"black"} />
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.menuLink}
              to={"/products"}
              onClick={props.closeSidebar}
            >
              <GridIcon />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.menuLink}
              to={"/cart"}
              onClick={props.closeSidebar}
            >
              <span className={classes.iconCart}>
                <IconShoppingCart />
                {cartItemCount > 0 && (
                  <div className={classes.cartControl}>
                    <p>{cartItemCount}</p>
                  </div>
                )}
              </span>
              <span>Cart</span>
            </NavLink>
          </li>
        </ul>
        <button className={classes.buttonLogout} onClick={props.logout}>
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