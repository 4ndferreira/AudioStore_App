import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import ArrowRight from './ArrowRight';
import classes from './Banner.module.css'

const Banner = (props: { title: string }) => {
  return (
    <div className={classes.bannerContainer}>
      <div className={classes.bannerText}>
        <h3>
          {props.title}
        </h3>
        <div className={classes.bannerLink}>
          <p>Shop now</p>
          <ArrowRight />
        </div>
      </div>
      <img src="/img/image5.png" alt="" />
    </div>
  );
}

export default Banner
