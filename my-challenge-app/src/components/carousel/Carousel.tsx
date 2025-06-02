//Splide
import {
  Splide,
  SplideSlide,
  SplideTrack,
} from "../../../node_modules/@splidejs/react-splide";
//Interface
import { Data } from "../../hooks/useFetch";
//Components
import Banner from "../banner/Banner";
import Card from "../card/Card";
import CardForNoProductFound from "../cardForNoProductFound/CardForNoProductFound";
// CSS
import "../../splide-skyblue.min__custom.css";

export default function Carousel(props: {
  isBanner: boolean;
  filteredData: Data[] | undefined;
}) {
  return (
    <>
      {props.filteredData?.length !== 0 ? (
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
                ...(!props.isBanner && { perPage: 5 }),
              },
            },
          }}
        >
          <SplideTrack>
            {props.filteredData?.map(
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
            )}
          </SplideTrack>
          <ul
            className="splide__pagination"
            style={{ bottom: props.isBanner ? "-1.45rem" : "-1.25rem" }}
          />
        </Splide>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <CardForNoProductFound isBanner={props.isBanner} />
          {!props.isBanner && (
            <CardForNoProductFound isBanner={props.isBanner} />
          )}
        </div>
      )}
    </>
  );
}
