//React loading Skeleton
import Skeleton, { SkeletonTheme} from "react-loading-skeleton"
//Hook
import { useMediaQuery } from "../../hooks/useMediaQuery";
//CSS
import 'react-loading-skeleton/dist/skeleton.css'
import classes from './BannerSkeleton.module.css'

export default function BannerSkeleton() {
  const isDesktop = useMediaQuery();
  
  return (
    <SkeletonTheme>
      <div className={classes.container}>
        <div className={classes.textSkeleton}>
          <Skeleton
            count={3}
            height={isDesktop? "1.65rem" : "1.375rem"}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton count={1} width={"60%"} height={"1rem"} />
        </div>
        <Skeleton 
          width={isDesktop? "163.125px" : "134.05px"} 
          height={isDesktop? "176px" : "144.63px"} 
        />
      </div>
    </SkeletonTheme>
  );
}