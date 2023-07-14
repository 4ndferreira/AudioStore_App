import LinkViewMore from './LinkViewMore'
import classes from './Card.module.css'

const Card = () => {
  return (
    <div className={classes.cardContainer}>
      <img src="/img/image5.png" alt="" />
      <div className={classes.cardText}>
        <h4>TMA-2 HD Wireless</h4>
        <p>USD 350</p>
        <div>
          <LinkViewMore />
        </div>
      </div>
    </div>
  )
}

export default Card
