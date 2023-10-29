//Splide
import {
  Splide,
  SplideSlide,
  SplideTrack,
} from "../../../node_modules/@splidejs/react-splide";
//Hook
import { useMediaQuery } from "../../hooks/useMediaQuery";
//Interface
import { Data } from "../../hooks/useFetch";
//Components
import Banner from "../banner/Banner";
import Card from "../card/Card";
import NoProduct from "../noProduct/NoProduct";
import SplideArrowButton from "../splideArrowButton/SplideArrowButton";
// CSS
import "../../../node_modules/@splidejs/react-splide/dist/css/themes/splide-skyblue.min.css";
import classes from "./Carousel.module.css";
import "./SplideStyleCustom.css"

export default function Carousel(props: {
  isBanner: boolean;
  filteredData: Data[] | undefined;
}) {
  const isDesktop = useMediaQuery();
  
  return (
    <Splide
      hasTrack={false}
      options={{
        width: "100%",
        autoWidth: true,
        arrows: false,
        pagination: false,
        perPage: 1,
        gap: "0.94rem",
        mediaQuery: "min",
        breakpoints: {
          1224: {
            arrows: true,
            pagination: true,
            ...(!props.isBanner && { perPage: 5 })
          }
        }
      }}
    >
      <SplideTrack className={isDesktop ? undefined : classes.splideTrack}>
        {props.filteredData?.length !== 0 ? (
          props.filteredData?.map(
            (item, index) =>
              index < 8 && (
                <SplideSlide key={item.id}>
                  {props.isBanner ? (
                    <Banner
                      id={item.id}
                      key={item.id}
                      title={item.name}
                      category={item.category}
                    />
                  ) : (
                    <Card
                      id={item.id}
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      category={item.category}
                      rating={item.rating}
                      showReview={false}
                    />
                  )}
                </SplideSlide>
              )
          )
        ) : (
          <div className={classes.wrapper}>
            <NoProduct isBanner={props.isBanner} />
            {props.isBanner && <NoProduct isBanner={props.isBanner} />}
          </div>
        )}
      </SplideTrack>
      <div className="splide__arrows">
        <SplideArrowButton styleButton={"splide__arrow splide__arrow--prev"} />
        <SplideArrowButton styleButton={"splide__arrow splide__arrow--next"} />
      </div>
      <ul
        className="splide__pagination"
        style={{ bottom: props.isBanner ? "-1.3rem" : "-1.1rem" }}
      />
    </Splide>
  );
}
