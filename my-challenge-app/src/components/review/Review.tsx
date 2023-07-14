import StarRating from '../starRating/StarRating'
import classes from './Review.module.css'

const Review = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.userInfo}>
        <img src='/public/img/ellipse10.png' alt='' />
        <div className={classes.userInfoText}>
          <h4>Madelina</h4>
          <StarRating />
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

export default Review
