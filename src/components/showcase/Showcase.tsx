//React Router
import { Link } from "react-router-dom";
//Interface
import { Data } from "../../hooks/useFetch";
//Hook
import { useMediaQuery } from "../../hooks/useMediaQuery";
//Components
import CardSkeleton from "../cardSkeleton/CardSkeleton";
import Carousel from "../carousel/Carousel";
//CSS
import classes from "./Showcase.module.css";

export default function Showcase(props: {
  title: string;
  condition: boolean;
  filteredData: Data[]| undefined;
}) {
  const isDesktop = useMediaQuery();
  return (
    <>
      <div className={classes.showcaseText}>
        <h4>{props.title}</h4>
        <Link to="/products">See All</Link>
      </div>
      {props.condition ? (
        <div className={classes.containerSkeleton}>
          <CardSkeleton cards={isDesktop ? 5 : 2} />
        </div>
      ) : (
        <Carousel filteredData={props.filteredData} isBanner={false} />
      )}
    </>
  );
}