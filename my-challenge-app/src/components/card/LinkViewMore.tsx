import IconStarFilled from "./IconStarFilled";
import IconMoreVertical from "./IconMoreVertical"

import classes from './LinkViewMore.module.css'

const LinkViewMore = () => {
  return (
    <div className={classes.container}>
      <IconStarFilled/>
      <p>Reviews</p>
      <IconMoreVertical />
    </div>
  );
}

export default LinkViewMore
