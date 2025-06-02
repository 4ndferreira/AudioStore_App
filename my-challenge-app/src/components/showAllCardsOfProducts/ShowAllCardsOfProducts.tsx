//Interface
import { Data } from "../../hooks/useFetch";
//Component
import Card from "../card/Card";

export default function ShowAllCardsOfProducts(props: { data: Data[] | undefined }) {
  return (
    <>
      {props.data?.map((item) => (
        <Card
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          rating={item.rating}
          showReview={true}
          category={item.category}
        />
      ))}
    </>
  );
}