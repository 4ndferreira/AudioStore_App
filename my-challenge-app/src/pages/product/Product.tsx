//Hooks
import { ChangeEvent, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
//Components
import NavBar from "../../components/navBar/NavBar";
import DetailsToggle from "../../components/detailsToggle/DetailsToggle";
import Review from "../../components/review/Review";
import Card from "../../components/card/Card";
//CSS
import classes from './Product.module.css'
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'

const Product = () => {
  const { data, loading, error } = useFetch('https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc');
  const [ detailsToggle, setDetailsToggle] = useState ('Overview')
  const { id } = useParams();
  const navigate = useNavigate();

  if(loading) {
    return <p>Loading...</p>
  }
  
  const item = data?.find((item) => id && item.id === parseInt(id));

  const handleSelectChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target
    setDetailsToggle(value)
  }

  if(!item) {
    return <p>No product found</p>
  }

  if(item) return (
    <div>
      <NavBar 
        link="/" 
        link2="/cart" 
        title={""} 
      />
      <div className={classes.textWrapper}>
        <p className={classes.textPrice}>USD {item.price.replace("$", "")}</p>
        <h2 className={classes.textTitle}>{item.name.toUpperCase()}</h2>
      </div>
      <DetailsToggle 
        selected={detailsToggle} 
        onChange={handleSelectChange} 
      />
      {detailsToggle === "Overview" ? (
        <>
          <div className={classes.imageWrapper}>
            <img src="/public/img/image6.png" alt="" />
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
          <div>
            <h4>Another Product</h4>
            <NavLink to="/products">See All</NavLink>
          </div>
          <Splide
            options={{
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
        </>
      ) : (
        <p>{item.description}</p>
      )}
    </div>
  );
}

export default Product
