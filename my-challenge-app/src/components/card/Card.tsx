import LinkViewMore from './LinkViewMore'
import classes from './Card.module.css'

const Card = (props: {
  name: string,
  price: string,
  rating: number,
  showReview: boolean 
}) => {
  return (
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
  )
}

export default Card
