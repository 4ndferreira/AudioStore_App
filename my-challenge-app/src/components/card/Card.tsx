import LinkViewMore from './LinkViewMore'
import classes from './Card.module.css'

const Card = (props: {
  name: string,
  price: string,
  showReview: boolean 
}) => {
  return (
    <div className={classes.cardContainer}>
      <img src="/img/image5.png" alt="" />
      <div>
        <h4>{props.name}</h4>
        <p className={classes.cardContainerText}>{props.price}</p>
      </div>
      {props.showReview && 
      <div className={classes.cardReview}>
        <LinkViewMore />
      </div>}
    </div>
  )
}

export default Card
