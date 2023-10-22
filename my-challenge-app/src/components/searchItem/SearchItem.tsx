//React Router DOM
import { Link } from 'react-router-dom';
//Components
import LinkViewMore from '../card/LinkViewMore';
import Counter from '../counter/Counter';
//CSS
import classes from './SearchItem.module.css'
//Image
import Image from '/img/image5.png'

const SearchItem = (props: {
  itemId: number;
  count: number;
  name: string;
  price: string;
  rating: number;
  isShoppingCart: boolean
  showModal: () => void;
  onItemDelete: (itemId: number) => void;
}) => {
  return (
    <li className={classes.container}>
      <Link 
        to={`/products/${props.itemId}`}
        state={props.isShoppingCart ? { isPush: true } : { isPush: false }}
        className={classes.itemImageContainer}
      >
        <img src={Image} alt="" height={"80px"} width={"68.81px"} loading="lazy" />
      </Link>
      <div className={classes.itemTextContainer}>
        <Link 
          to={`/products/${props.itemId}`} 
          state={props.isShoppingCart ? { isPush: true } : { isPush: false }}
          className={classes.link}
        >
          <h4>{props.name}</h4>
        </Link>
        <ul>
          <li>USD {props.price.replace('$','')}</li>
          {props.isShoppingCart ? (
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

export default SearchItem