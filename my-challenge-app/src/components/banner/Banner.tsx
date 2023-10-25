import { Link } from 'react-router-dom';
import ArrowRight from '../icons/ArrowRight';
import GetImage from '../getImage/GetImage';
//CSS
import classes from './Banner.module.css'
//Image
import Image from '/img/image5.png'

const Banner = (props: {
  id: number; 
  title: string;
  category: string
}) => {
  return (
    <div className={classes.bannerContainer}>
      <div className={classes.bannerText}>
        <h3>
          {props.title}
        </h3>
        <Link 
          to={`/products/${props.id}`} 
          className={classes.bannerLink}
        >
          <p>Shop now</p>
          <ArrowRight />
        </Link>
      </div>
      <img src={GetImage(props.category, false)} alt="" height={"144.63px"} width={"124.41px"} />
    </div>
  );
}

export default Banner
