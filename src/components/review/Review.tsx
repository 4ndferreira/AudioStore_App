import StarRating from '../starRating/StarRating'
import IconUser from '../icons/IconUser';
import classes from './Review.module.css'

const Review = (props: {
  user: string; 
  description: string 
  rating: number;
}) => {
  return (
    <li className={classes.wrapper}>
      <div className={classes.userInfo}>
        <IconUser />
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
