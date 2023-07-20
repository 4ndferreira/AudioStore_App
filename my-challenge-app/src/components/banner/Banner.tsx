import { NavLink } from 'react-router-dom';
import ArrowRight from './ArrowRight';
import classes from './Banner.module.css'

const Banner = (props: {
  id: number; 
  title: string 
}) => {
  return (
    <div className={classes.bannerContainer}>
      <div className={classes.bannerText}>
        <h3>
          {props.title}
        </h3>
        <NavLink 
          to={`/products/${props.id}`} 
          className={classes.bannerLink}
        >
          <p>Shop now</p>
          <ArrowRight />
        </NavLink>
      </div>
      <img src="/img/image5.png" alt="" />
    </div>
  );
}

export default Banner
