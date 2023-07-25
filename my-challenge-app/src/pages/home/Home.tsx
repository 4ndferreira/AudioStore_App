//React
import { ChangeEvent, useState } from "react"
//React Router Dom
import { Link, useNavigate } from "react-router-dom"
//Splide
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
//Firebase
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/Config" 
//Hook
import { useFetch } from "../../hooks/useFetch"
// Components
import Header from "../../components/header/Header"
import Categories from "../../components/categories/Categories"
import Banner from "../../components/banner/Banner"
import Card from "../../components/card/Card"
import Input from "../../components/input/Input"
import SearchIcon from "../../components/labelInput/SearchIcon"
import Loader from "../../components/loader/Loader"
import IconShoppingBag from "../../components/iconShoppingBag/IconShoppingBag"
// CSS
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'
import classes from './Home.module.css'

const Home = () => {
  const { data, loading } = useFetch('https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc');
  const [ filterCategory, setFilterCategory] = useState ('')
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Sign-out successful.')
      navigate('/signin')
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
    });
  }

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFilterCategory(value)
  }

  const filteredData = data?.filter((item) => 
    item.category.includes(filterCategory)
  );

  if(loading){
    return <Loader />
  }

  return (
    <>
      <div className={classes.container}>
        <Header image={auth.currentUser?.photoURL} onClick={handleSignOut} />
        <h3 className={classes.welcomeText}>
          <small className={classes.welcomeTextSmall}>
            Hi,{" "}
            {auth.currentUser?.displayName
              ? auth.currentUser?.displayName.split(" ")[0]
              : auth.currentUser?.email?.split("@")[0]}
          </small>
          What are you looking for today?
        </h3>
      </div>
      <Link to="/search" className={classes.linkSearch}>
        <div className={classes.wrapper}>
          <Input
            id={"searchBar"}
            type={"text"}
            name={"Search headphone"}
            element={<SearchIcon />}
            value={""}
            onInput={undefined}
          />
        </div>
      </Link>
      <section className={classes.showcase}>
        <div className={classes.showcaseContainer}>
          <Categories
            filterSelected={filterCategory}
            onChange={handleSelectChange}
          />
          <div className={classes.carouselBanner}>
            <Splide
              options={{
                width: "100vw",
                autoWidth: true,
                arrows: false,
                pagination: false,
                gap: "0.94rem",
              }}
            >
              {filteredData?.length !== 0 ? (
                filteredData?.map((item) => (
                  <SplideSlide key={item.id}>
                    <Banner 
                      key={item.id} 
                      title={item.name} 
                      id={item.id} 
                    />
                  </SplideSlide>
                ))
              ) : (
                <li className={classes.noReturn}>
                  <h2>Ops! No products found in this category.</h2>
                  <IconShoppingBag 
                    width={"96"}
                    height={"96"} 
                    color={"#BABABA"}                  
                  />
                </li>
              )}
            </Splide>
          </div>
          <div className={classes.showcaseText}>
            <h4>Featured Products</h4>
            <Link to="/products">See All</Link>
          </div>
          <div className={classes.carouselFeat}>
            <Splide
              options={{
                width: "100vw",
                autoWidth: true,
                arrows: false,
                pagination: false,
                gap: "0.94rem",
              }}
            >
              {filteredData?.length !== 0 ? (
                filteredData?.map((item) => (
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
                ))
              ) : (
                <li className={classes.noReturn}>
                  <h2>Ops! No products found in this category.</h2>
                  <IconShoppingBag 
                    width={"96"}
                    height={"96"} 
                    color={"#BABABA"}                  
                  />
                </li>
              )}
            </Splide>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home
