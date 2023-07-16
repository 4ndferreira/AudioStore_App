import LinkViewMore from '../card/LinkViewMore';
import Counter from '../counter/Counter';
import classes from './SearchItem.module.css'

const SearchItem = (props: {
  name: string;
  price: string;
  rating: string;
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
              <Counter />
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
