//React loading Skeleton
import Skeleton, { SkeletonTheme} from "react-loading-skeleton"
//Skeleton
import 'react-loading-skeleton/dist/skeleton.css'
import classes from './BannerSkeleton.module.css'

const BannerSkeleton = () => {
  return (
    <SkeletonTheme>
      <div className={classes.container}>
        <div className={classes.textSkeleton}>
          <Skeleton
            count={3}
            height={"1.375rem"}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton count={1} width={"60%"} height={"1rem"} />
        </div>
        <Skeleton width={"134.05px"} height={"144.63px"} />
      </div>
    </SkeletonTheme>
  );
};

export default BannerSkeleton