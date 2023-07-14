import LinkViewMore from '../card/LinkViewMore';
import classes from './SearchItem.module.css'

const SearchItem = () => {
  return (
    <div className={classes.container}>
      <div className={classes.itemImageContainer}>
        <img src='/img/image5.png' alt='' />
      </div>
      <div className={classes.itemTextContainer}>
        <h4>TMA-2 Comfort Wireless</h4>
        <ul>
          <li>USD 270</li>
          <li className={classes.itemReview}>
            <LinkViewMore />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchItem
