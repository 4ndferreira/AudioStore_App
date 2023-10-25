//React
import { ChangeEvent, useContext, useState } from "react";
//React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Splide
import { Splide, SplideSlide, SplideTrack } from '../../../node_modules/@splidejs/react-splide'
//Context
import { CartContext } from "../../store/CartContext";
//Components
import NavBar from "../../components/navBar/NavBar";
import DetailsToggle from "../../components/detailsToggle/DetailsToggle";
import Review from "../../components/review/Review";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import ContainerButton from "../../components/containerButton/ContainerButton";
import ProductSkeleton from "../../components/productSkeleton/ProductSkeleton";
import NotFound from "../notFound/NotFound";
import LoadingError from "../../components/loadingError/LoadingError";
import GetImage from "../../components/getImage/GetImage";
//CSS
import classes from './Product.module.css'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'

const Product = () => {
  const { data, loading, error } = useFetch();

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

  return (
    <>
      {!data || loading ? (
        <>
          <ProductSkeleton />
          <LoadingError error={error} />
        </>
      ) : !item ? (
        <NotFound />
      ) : (
        <>
          <div className={classes.containerHeader}>
            <NavBar link="/" title={" "} isShoppingCart={false} />

            <div className={classes.textWrapper}>
              <p className={classes.textPrice}>
                USD {item?.price.replace("$", "")}
              </p>
              <h2 className={classes.textTitle}>{item?.name.toUpperCase()}</h2>
            </div>

            <DetailsToggle
              selected={detailsToggle}
              onChange={handleSelectChange}
            />
          </div>
          {detailsToggle === "Overview" ? (
            <div>
              <section className={classes.productOverview}>
                <div className={classes.imageWrapper}>
                  <img src={GetImage(item.category, true)} alt="" placeholder="" />
                </div>

                <h4 className={classes.textTitleReviews}>
                  Reviews ({item ? item.reviews.length : 0})
                </h4>
                <ul className={classes.listReviews}>
                  {item?.reviews.map((review) => (
                    <Review
                      key={review.id}
                      user={review.user}
                      description={review.description}
                      rating={review.rating}
                    />
                  ))}
                </ul>
              </section>
              <section className={classes.sectionBackground}>
                <div className={classes.anotherProduct}>
                  <div className={classes.textLink}>
                    <h4>Another Product</h4>
                    <Link to="/products" state={{ isPush: true }}>
                      See All
                    </Link>
                  </div>
                  <Splide
                    hasTrack={false}
                    options={{
                      width: "100vw",
                      autoWidth: true,
                      arrows: false,
                      pagination: false,
                      gap: "0.94rem",
                    }}
                  >
                    <SplideTrack className={classes.splideTrack}>
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
                                category={item.category}
                                showReview={false}
                              />
                            </SplideSlide>
                          )
                      )}
                    </SplideTrack>
                  </Splide>
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
      )}
    </>
  );
}

export default Product