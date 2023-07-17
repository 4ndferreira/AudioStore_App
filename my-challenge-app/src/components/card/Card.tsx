import LinkViewMore from './LinkViewMore'
import classes from './Card.module.css'
import { NavLink } from 'react-router-dom'

const Card = (props: {
  id: number,
  name: string,
  price: string,
  rating: number,
  showReview: boolean 
}) => {
  return (
    <NavLink 
      to={`/products/${props.id}`} 
      className={classes.link}
    >
      <div className={classes.cardContainer}>
        <img src="/img/image5.png" alt="" />
        <div>
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
    </NavLink>
  )
}

export default Card
