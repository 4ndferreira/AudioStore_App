//React Router DOM
import { Link } from 'react-router-dom'
//Component
import LinkViewMore from './LinkViewMore'
//CSS
import classes from './Card.module.css'
import GetImage from '../getImage/GetImage'

const Card = (props: {
  id: number,
  name: string,
  price: string,
  rating: number,
  category: string,
  showReview: boolean 
}) => {
  return (
    <Link 
      to={`/products/${props.id}`} 
      className={classes.link}
    >
      <div className={classes.cardContainer}>
        <div className={classes.cardImage}>
          <img 
            src={GetImage(props.category, false)} 
            alt="" 
            height={"100%"} 
            loading="lazy" 
          />
        </div>
        <div className={classes.cardText}>
          <h4>{props.name}</h4>
          <p className={classes.cardContainerText}>
            USD {props.price.replace('$','')}
          </p>
        </div>
        {props.showReview && 
        <div className={classes.cardReview}>
          <LinkViewMore rating={props.rating} />
        </div>}
      </div>
    </Link>
  )
}

export default Card
