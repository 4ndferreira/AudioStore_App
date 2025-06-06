//React loading Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
//Components
import ReviewSkeleton from "../reviewSkeleton/ReviewSkeleton";
//CSS
import classes from "./ProductSkeleton.module.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
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
    </>
  );
}
