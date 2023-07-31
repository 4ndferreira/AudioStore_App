//React loading Skeleton
import Skeleton, { SkeletonTheme} from "react-loading-skeleton"
//Skeleton
import 'react-loading-skeleton/dist/skeleton.css'
import classes from './CardSkeleton.module.css'

const CardSkeleton = (props: { cards: number; }) => {
  return Array(props.cards)
    .fill(0)
    .map((item, i) => (
      <SkeletonTheme
        key={i}
        baseColor="#eeeded"
        highlightColor="rgba(255, 255, 255, 0.5)"
      >
        <div className={classes.container}>
          <div className={classes.imageWrapper}>
            <Skeleton 
              containerClassName={classes.containterImageSkeleton} 
              className={classes.imageSkeleton} 
            />
          </div>
          <div className={classes.titleSkeleton}>
            <Skeleton 
              containerClassName={classes.containterTextSkeleton} 
              className={classes.textSkeleton}
            />
            <Skeleton 
              containerClassName={classes.containterTextSkeleton} 
              className={classes.textSkeleton}
            />
          </div>
          <Skeleton 
            containerClassName={classes.containterTextSkeleton} 
            className={classes.textPriceSkeleton}
          />
        </div>
      </SkeletonTheme>
    ));
};

export default CardSkeleton