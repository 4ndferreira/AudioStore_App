//Splide
import {
  Splide,
  SplideSlide,
  SplideTrack,
} from "../../../node_modules/@splidejs/react-splide";
//Interface
import { Data } from "../../hooks/useFetch";
//Components
import ShowAllCardsOfProducts from "../showAllCardsOfProducts/ShowAllCardsOfProducts";
//CSS
import "../../splide-skyblue.min__custom.css";
import classes from "./PagesWithAllProducts.module.css";

export default function PagesWithAllProducts(props: {
  sortedData: Data[] | undefined;
}) {
  //Declared variable that establishes the number of items per page
  const perPage = 10;
  //Declared the variable of a new array containing the arrays separated by the number of items on the page
  const dataSplit: Data[][] = [];
  //Iteration to separate all items into smaller arrays
  if (props.sortedData) {
    for (let i = 0; i < props.sortedData.length; i += perPage) {
      const page = props.sortedData.slice(i, i + perPage);
      dataSplit.push(page);
    }
  }

  return (
    <Splide
      hasTrack={false}
      options={{ width: "60rem", arrows: false, pagination: true, drag: false }}
    >
      <SplideTrack>
        {dataSplit.map((page: Data[], index) => (
          <SplideSlide className={classes.container} key={index}>
            <ShowAllCardsOfProducts data={page} />
          </SplideSlide>
        ))}
      </SplideTrack>
      <ul
        className="splide__pagination splide__pagination"
        style={{ bottom: "-1.2rem" }}
      />
    </Splide>
  );
}
