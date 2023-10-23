//React Router Dom
import { Link } from "react-router-dom";
//React loading Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
//Components
import ReviewSkeleton from "../reviewSkeleton/ReviewSkeleton";
import CardSkeleton from "../cardSkeleton/CardSkeleton";
//CSS
import classes from './ProductSkeleton.module.css'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductSkeleton = () => {
  return (
    <>
      <div className={classes.container}>
        <SkeletonTheme
          baseColor="#eeeded"
          highlightColor="rgba(255, 255, 255, 0.5)"
        >
          <div className={classes.textWrapperSkeleton}>
            <Skeleton className={classes.textPriceSkeleton} />
            <Skeleton count={2} className={classes.textTitleSkeleton} />
          </div>
          <div className={classes.toggleSkeleton}>
            <Skeleton className={classes.toggleOptionSkeleton} />
            <Skeleton className={classes.toggleOptionSkeleton} />
          </div>
          <Skeleton className={classes.imageSkeleton} />
          <Skeleton className={classes.reviewTextSkeleton} />
        </SkeletonTheme>
        <div className={classes.listReviews}>
          <ReviewSkeleton cards={2} />   
        </div>
      </div>
      <section className={classes.sectionBackground}>
        <div className={classes.anotherProduct}>
          <div className={classes.textLink}>
            <h4>Another Product</h4>
            <Link to="/products" state={{ isPush: true }}>See All</Link>
          </div>
          <div className={classes.containerSkeleton}>
            <CardSkeleton cards={2} />
          </div>        
        </div>
      </section>
    </>
  );
}

export default ProductSkeleton