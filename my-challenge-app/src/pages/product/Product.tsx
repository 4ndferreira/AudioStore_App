//React
import { ChangeEvent, Suspense, lazy, useContext, useState } from "react";
//React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Splide
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
//React loading Skeleton
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
//Components
import NavBar from "../../components/navBar/NavBar";
import DetailsToggle from "../../components/detailsToggle/DetailsToggle";
import Review from "../../components/review/Review";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { CartContext } from "../../store/CartContext";
import ReviewSkeleton from "../../components/reviewSkeleton/ReviewSkeleton";
import ContainerButton from "../../components/containerButton/ContainerButton";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";
import NotFound from "../notFound/NotFound";
//Image
import Image from '/img/image6.png'
//CSS
import classes from './Product.module.css'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

const Product = () => {
  // const { data, loading, error } = useFetch(
  //   "https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc"
  // );
  const { data, loading, error } = useFetch(
    "http://localhost:3000/products"
  );

  const [detailsToggle, setDetailsToggle] = useState("Overview");

  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  const item = data?.find((item) => id && item.id === parseInt(id));

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDetailsToggle(value);
  };

  const handleClick = () => {
    item && addToCart(item);
    navigate("/cart");
  };

  // if(!data) {
  //   return <Loader />
  // }

  if(!loading && !item) {
    return <NotFound />
  }

  return (
    <>
      <div className={classes.containerHeader}>
        <NavBar link="/" title={" "} isShoppingCart={false} />
        {loading ? (
          <SkeletonTheme
            baseColor="#eeeded"
            highlightColor="rgba(255, 255, 255, 0.5)"
          >
            <div className={classes.textWrapperSkeleton}>
              <Skeleton className={classes.textPriceSkeleton} />
              <Skeleton count={2} className={classes.textTitleSkeleton} />
            </div>
          </SkeletonTheme>
        ) : (
          <div className={classes.textWrapper}>
            <p className={classes.textPrice}>
              USD {item?.price.replace("$", "")}
            </p>
            <h2 className={classes.textTitle}>{item?.name.toUpperCase()}</h2>
          </div>
        )}
        <DetailsToggle selected={detailsToggle} onChange={handleSelectChange} />
      </div>
      {detailsToggle === "Overview" ? (
        <div>
          <section className={classes.productOverview}>
            {loading ? (
              <SkeletonTheme
                baseColor="#eeeded"
                highlightColor="rgba(255, 255, 255, 0.5)"
              >
                <Skeleton className={classes.imageSkeleton} />
              </SkeletonTheme>
            ) : (
              <div className={classes.imageWrapper}>
                <img src={Image} alt="" placeholder="" height={"333.47px"} />
              </div>
            )}
            <h4 className={classes.textTitleReviews}>
              Reviews ({item ? item.reviews.length : 0})
            </h4>
            <ul className={classes.listReviews}>
              {loading ? (
                <ReviewSkeleton cards={2} />
              ) : (
                item?.reviews.map((review) => (
                  <Review
                    key={review.id}
                    user={review.user}
                    description={review.description}
                    rating={review.rating}
                  />
                ))
              )}
            </ul>
          </section>
          <section className={classes.sectionBackground}>
            <div className={classes.anotherProduct}>
              <div className={classes.textLink}>
                <h4>Another Product</h4>
                <Link to="/products" state={{ isPush: true }}>See All</Link>
              </div>
              {loading ? (
                <div className={classes.containerSkeleton}>
                  <CardSkeleton cards={2} />
                </div>
              ) : (
                <Splide
                  options={{
                    width: "100vw",
                    autoWidth: true,
                    arrows: false,
                    pagination: false,
                    gap: "0.94rem",
                  }}
                >
                  {data?.map(
                    (item, index) =>
                      index < 8 && (
                        <SplideSlide key={item.id}>
                          <Card
                            id={item.id}
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            rating={item.rating}
                            showReview={false}
                          />
                        </SplideSlide>
                      )
                  )}
                </Splide>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className={classes.textDescription}>
          <h4 className={classes.textDescriptionTitle}>
            {item?.description.title}
          </h4>
          {item?.description.content.map((paragraph, index) => (
            <p className={classes.textDescriptionParagraph} key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <ContainerButton>
        <div className={classes.positionButton}>
          <div className={classes.wrapperButton}>
            <Button type={"button"} onClick={handleClick}>
              Add To Cart
            </Button>
          </div>
        </div>
      </ContainerButton>
    </>
  );
}

export default Product