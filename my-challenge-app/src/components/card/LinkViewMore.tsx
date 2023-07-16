import IconStarFilled from "../starRating/IconStarFilled";
import IconMoreVertical from "./IconMoreVertical";

const LinkViewMore = (props: { rating: string }) => {
  return (
    <>
      <div>
        <IconStarFilled />
        <p>{props.rating}</p>
        <p>Reviews</p>
      </div>
      <IconMoreVertical />
    </>
  );
};

export default LinkViewMore;
