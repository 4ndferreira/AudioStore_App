import StarRating from '../starRating/StarRating'
import classes from './Review.module.css'

const Review = (props: {
  user: string; 
  description: string 
  rating: number;
}) => {
  return (
    <li className={classes.wrapper}>
      <div className={classes.userInfo}>
        <img src='/public/img/ellipse10.png' alt='' />
        <div className={classes.userInfoText}>
          <h4>{props.user}</h4>
          <StarRating 
            rating={props.rating} 
          />
        </div>
      </div>
      <p>
        {props.description}
      </p>
    </li>
  );
}

export default Review
