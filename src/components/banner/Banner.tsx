//React Router
import { Link } from "react-router-dom";
//Components
import ArrowRight from "../icons/ArrowRight";
import GetImage from "../getImage/GetImage";
//CSS
import styles from "./Banner.module.scss";

export interface BannerProp {
  id: number;
  title: string;
  category: string;
}

export default function Banner({ id, title, category }: BannerProp) {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerText}>
        <h3>{title}</h3>
        <Link to={`/products/${id}`} className={styles.bannerLink}>
          <p>Shop now</p>
          <ArrowRight />
        </Link>
      </div>
      <img
        src={GetImage(category, false)}
        alt={category}
        height={"144.63px"}
        width={"124.41px"}
      />
    </div>
  );
}