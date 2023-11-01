//React loading Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
//CSS
import "react-loading-skeleton/dist/skeleton.css";
import classes from "./cardSkeletonForCartItemsOrSearchItems.module.css";

export default function cardSkeletonForCartItemsOrSearchItems(props: {
  cards: number;
}) {
  return Array(props.cards)
    .fill(0)
    .map((item, i) => (
      <SkeletonTheme key={i}>
        <div className={classes.container}>
          <Skeleton width={"4.6875rem"} height={"4.6875rem"} />
          <div className={classes.containerTextSkeleton}>
            <div className={classes.textSkeleton}>
              <Skeleton height={"1.3125rem"} />
              <Skeleton height={"1.125rem"} width={"3.625rem"} />
            </div>
            <Skeleton count={1} width={"6.75rem"} height={"1rem"} />
          </div>
        </div>
      </SkeletonTheme>
    ));
}