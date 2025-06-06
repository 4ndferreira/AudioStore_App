//React loading Skeleton
import Skeleton, { SkeletonTheme} from "react-loading-skeleton"
//Skeleton
import 'react-loading-skeleton/dist/skeleton.css'
import classes from './ReviewSkeleton.module.css'

const ReviewSkeleton = (props: { cards: number }) => {
  return Array(props.cards)
    .fill(0)
    .map((item, i) => (
      <SkeletonTheme
        key={i}
        baseColor="#eeeded"
        highlightColor="rgba(255, 255, 255, 0.5)"
      >
        <li className={classes.wrapper}>
          <div className={classes.userInfo}>
            <Skeleton circle={true} width={"40px"} height={"40px"} />
            <div>
              <Skeleton width={"120px"} height={"20px"} />
              <Skeleton width={"100px"} height={"16px"} />
            </div>
          </div>
          <p>
            <Skeleton count={2} />
          </p>
        </li>
      </SkeletonTheme>
    ));
};

export default ReviewSkeleton
