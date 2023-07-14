import IconStarFilled from "./IconStarFilled";
import IconStarOutlined from "./IconStarOutlined";
import classes from './StarRating.module.css'

const StarRating = () => {
  const rating = 3;
  return (
    <div className={classes.wrapper}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span key={index}>
            {index <= rating ? <IconStarFilled /> : <IconStarOutlined />}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating