import { NavLink } from 'react-router-dom';
import LinkViewMore from '../card/LinkViewMore';
import Counter from '../counter/Counter';
import classes from './SearchItem.module.css'

const SearchItem = (props: {
  itemId: number;
  count: number;
  name: string;
  price: string;
  rating: number;
  isShoppingCart: boolean
}) => {
  return (
    <li className={classes.container}>
      <NavLink 
        to={`/products/${props.itemId}`} 
        className={classes.itemImageContainer}
      >
        <img src="/img/image5.png" alt="" />
      </NavLink>
      <div className={classes.itemTextContainer}>
        <NavLink 
          to={`/products/${props.itemId}`} 
          className={classes.link}
        >
          <h4>{props.name}</h4>
        </NavLink>
        <ul>
          <li>USD {props.price.replace('$','')}</li>
          {props.isShoppingCart ? (
            <li>
              <Counter 
                count={props.count} 
                itemId={props.itemId}           
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

export default SearchItem
