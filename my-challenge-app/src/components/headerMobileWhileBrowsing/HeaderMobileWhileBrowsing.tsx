//React
import { useContext } from 'react'
//React Router Dom
import { useLocation, useNavigate } from 'react-router-dom'
//Context
import { CartContext } from '../../store/CartContext'
//Components
import ChevronLeft from '../icons/ChevronLeft'
import IconTrash from '../icons/IconTrash'
import IconShoppingCart from '../icons/IconShoppingCart'
//CSS
import classes from './HeaderMobileWhileBrowsing.module.css'

export default function HeaderMobileWhileBrowsing() {
  const { cartItemCount, clearCart } = useContext(CartContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isShoppingCart = pathname === "/cart";
  const isSearchPage = pathname === "/search";
  const link = isShoppingCart ? "/products" : "/";

  const GoBack = () => {
    navigate(link, { state: { isPush: true } });
  };

  const GoForward = () => {
    isShoppingCart ? clearCart() : navigate("/cart");
  };

  return (
    <header className={classes.wrapper}>
      <h2 className={classes.title}>
        {isShoppingCart ? "Shopping Cart" : isSearchPage ? "Search" : " "}
      </h2>
      <nav className={classes.wrapperNav}>
        <button className={classes.buttonToNavigate} onClick={GoBack}>
          <ChevronLeft />
        </button>
        <button className={classes.buttonToNavigate} onClick={GoForward}>
          {isShoppingCart ? (
            <IconTrash iconWidth={"24"} iconHeight={"24"} color={"#000000"} />
          ) : (
            <div className={classes.iconCart}>
              <IconShoppingCart />
              {cartItemCount > 0 && (
                <div className={classes.cartControl}>
                  <p>{cartItemCount}</p>
                </div>
              )}
            </div>
          )}
        </button>
      </nav>
    </header>
  );
}