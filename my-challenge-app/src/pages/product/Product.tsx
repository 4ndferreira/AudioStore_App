//React
import { ChangeEvent, useContext, useState } from "react";
//React Router Dom
import { NavLink, useNavigate, useParams } from "react-router-dom";
//Hooks
import { useFetch } from "../../hooks/useFetch";
//Splide
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
//Components
import NavBar from "../../components/navBar/NavBar";
import DetailsToggle from "../../components/detailsToggle/DetailsToggle";
import Review from "../../components/review/Review";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { CartContext } from "../../store/CartContext";
import Loader from "../../components/loader/Loader";
import IconAlert from "../../components/iconAlert/IconAlert";
//CSS
import classes from './Product.module.css'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'

const Product = () => {
  const { data, loading } = useFetch(
    "https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc"
  );
  const [detailsToggle, setDetailsToggle] = useState("Overview");

  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  const item = data?.find((item) => id && item.id === parseInt(id));

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDetailsToggle(value);
  };

  const handleClick = () => {
    item && addToCart(item);
    navigate("/cart");
  };

  if (!item) {
    return (
      <div className={classes.notFoundMessage}>
        <IconAlert width={"96"} height={"96"} />
        <h1 className={classes.notFoundText}>404 - Page Not Found</h1>
        <NavLink to={"/"} className={classes.notFoundLink}>
          Get me out of here!
        </NavLink>
      </div>
    );
  }

  if (item)
    return (
      <>
        <div className={classes.gridTop}>
          <NavBar
            link="/"
            link2="/cart"
            title={""}
            isShoppingCart={false}
            onClick={undefined}
          />
          <div className={classes.textWrapper}>
            <p className={classes.textPrice}>USD {item.price.replace("$", "")}</p>
            <h2 className={classes.textTitle}>{item.name.toUpperCase()}</h2>
          </div>
          <DetailsToggle selected={detailsToggle} onChange={handleSelectChange} />
        </div>
        {detailsToggle === "Overview" ? (
          <>
            <div className={classes.gridMiddle}>
              <div className={classes.imageWrapper}>
                <img src="/img/image6.png" alt="" />
              </div>
              <h4 className={classes.textTitleReviews}>
                Reviews ({item.reviews.length})
              </h4>
              <ul className={classes.listReviews}>
                {item &&
                  item.reviews.map((review) => (
                    <Review
                      key={review.id}
                      user={review.user}
                      description={review.description}
                      rating={review.rating}
                    />
                  ))}
              </ul>
            </div>
            <section className={classes.sectionBackground}>
              <div className={classes.anotherProduct}>
                <div className={classes.textLink}>
                  <h4>Another Product</h4>
                  <NavLink to="/products">See All</NavLink>
                </div>
                <div className={classes.wrapperCarousel}>
                  <Splide
                    options={{
                      width: '100vw',
                      autoWidth: true,
                      arrows: false,
                      pagination: false,
                      gap: "0.94rem",
                    }}
                  >
                    {data &&
                      data.map((item) => (
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
                      ))}
                  </Splide>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p className={classes.textDescription}>{item.description}</p>
        )}
        <div className={classes.wrapperButton}>
          <Button type={"button"} onClick={handleClick} name={"Add To Cart"} />
        </div>
      </>
    );
}

export default Product
