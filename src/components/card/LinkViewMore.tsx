import IconStarFilled from "../icons/IconStarFilled";
import IconMoreVertical from "../icons/IconMoreVertical";

const LinkViewMore = (props: { rating: number }) => {
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
