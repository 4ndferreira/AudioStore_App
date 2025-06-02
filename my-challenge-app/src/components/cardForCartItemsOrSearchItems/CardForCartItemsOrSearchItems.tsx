//React Hooks
import { useEffect, useState } from 'react';
//React Router DOM
import { Link, useLocation } from 'react-router-dom';
//Components
import LinkViewMore from '../card/LinkViewMore';
import Counter from '../counter/Counter';
import GetImage from '../getImage/GetImage';
//CSS
import classes from './CardForCartItemsOrSearchItems.module.css'

export default function CardForCartItemsOrSearchItems(props: {
  itemId: number;
  count: number;
  name: string;
  price: string;
  rating: number;
  category: string;
  showModal: () => void;
  onItemDelete: (itemId: number) => void;
}) {
  const [ isShoppingCart, setIsShoppingCart ] = useState(false)
  const { pathname } = useLocation()

  useEffect(()=>{
    setIsShoppingCart(pathname === "/cart")
  },[pathname])

  return (
    <li className={classes.container}>
      <Link
        to={`/products/${props.itemId}`}
        state={isShoppingCart ? { isPush: true } : { isPush: false }}
        className={classes.itemImageContainer}
        style={
          isShoppingCart
            ? { height: "5.4375rem", width: "5.4375rem" }
            : { height: "4.6875rem", width: "4.6875rem" }
        }
      >
        <img src={GetImage(props.category, false)} alt="" loading="lazy" />
      </Link>
      <div className={classes.itemTextContainer}>
        <Link
          to={`/products/${props.itemId}`}
          state={isShoppingCart ? { isPush: true } : { isPush: false }}
          className={classes.link}
        >
          <h4>{props.name}</h4>
        </Link>
        <ul>
          <li>USD {props.price.replace("$", "")}</li>
          {isShoppingCart ? (
            <li>
              <Counter
                itemId={props.itemId}
                showModal={props.showModal}
                onItemDelete={props.onItemDelete}
                count={props.count}
              />
            </li>
          ) : (
            <li className={classes.itemReview}>
              <LinkViewMore rating={props.rating} />
            </li>
          )}
        </ul>
      </div>
    </li>
  );
}