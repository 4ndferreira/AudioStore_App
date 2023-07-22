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
      <div className={classes.itemImageContainer}>
        <img src="/img/image5.png" alt="" />
      </div>
      <div className={classes.itemTextContainer}>
        <h4>{props.name}</h4>
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
            <NavLink 
              to={`/products/${props.itemId}`} 
              className={classes.link}
            >
              <li className={classes.itemReview}>
                <LinkViewMore rating={props.rating} />
              </li>
            </NavLink>
          )}
        </ul>
      </div>
    </li>
  );
}

export default SearchItem
