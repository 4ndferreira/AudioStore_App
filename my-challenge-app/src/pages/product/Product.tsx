//React
import { ChangeEvent, useContext, useState } from "react";
//React Router Dom
import { useNavigate, useParams } from "react-router-dom";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Context
import { CartContext } from "../../store/CartContext";
//Components
import NavBar from "../../components/navBar/NavBar";
import DetailsToggle from "../../components/detailsToggle/DetailsToggle";
import Review from "../../components/review/Review";
import Button from "../../components/button/Button";
import ContainerButton from "../../components/containerButton/ContainerButton";
import ProductSkeleton from "../../components/productSkeleton/ProductSkeleton";
import NotFound from "../notFound/NotFound";
import LoadingError from "../../components/loadingError/LoadingError";
import GetImage from "../../components/getImage/GetImage";
import Showcase from "../../components/showcase/Showcase";
//CSS
import classes from './Product.module.css'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'

export default function Product() {
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
      {error ? (
        <LoadingError />
      ) : data && !item ? (
        <NotFound />
      ) : (
        <>
          {!data || loading ? (
            <>
              <ProductSkeleton />
            </>
          ) : (
            <>
              <div className={classes.containerHeader}>
                <NavBar link="/home" title={" "} isShoppingCart={false} />

                <div className={classes.textWrapper}>
                  <p className={classes.textPrice}>
                    USD {item?.price.replace("$", "")}
                  </p>
                  <h2 className={classes.textTitle}>
                    {item?.name.toUpperCase()}
                  </h2>
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
                      <img
                        src={GetImage(item?.category, true)}
                        alt=""
                        placeholder=""
                      />
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
            </>
          )}
          {detailsToggle === "Overview" && (
            <section className={classes.sectionBackground}>
              <div className={classes.anotherProduct}>
                <Showcase
                  title={"Another Product"}
                  condition={!data || loading}
                  filteredData={data}
                />
              </div>
            </section>
          )}
          {data && (
            <ContainerButton>
              <div className={classes.positionButton}>
                <div className={classes.wrapperButton}>
                  <Button type={"button"} onClick={handleClick}>
                    Add To Cart
                  </Button>
                </div>
              </div>
            </ContainerButton>
          )}
        </>
      )}
    </>
  );
}