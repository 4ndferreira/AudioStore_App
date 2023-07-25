import { Link } from 'react-router-dom';
//Components
import LinkViewMore from '../card/LinkViewMore';
import Counter from '../counter/Counter';
//CSS
import classes from './SearchItem.module.css'
//Image
import Image from '../../../public/img/image5.png'

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
      <Link 
        to={`/products/${props.itemId}`} 
        className={classes.itemImageContainer}
      >
        <img src={Image} alt="" />
      </Link>
      <div className={classes.itemTextContainer}>
        <Link 
          to={`/products/${props.itemId}`} 
          className={classes.link}
        >
          <h4>{props.name}</h4>
        </Link>
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
