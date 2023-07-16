import { ChangeEvent, useState } from "react"
import { NavLink } from "react-router-dom"
import { Splide, SplideSlide } from '../../../node_modules/@splidejs/react-splide'
//Hook
import { useFetch } from "../../hooks/useFetch"
// Components
import Categories from "../../components/categories/Categories"
import Banner from "../../components/banner/Banner"
import Card from "../../components/card/Card"
import Input from "../../components/input/Input"
import SearchIcon from "../../components/labelInput/SearchIcon"
// CSS
import '../../../node_modules/@splidejs/react-splide/dist/css/splide.min.css'
import classes from './Home.module.css'

const Home = () => {
  const [ value, setValue ] = useState('')
  const { data, loading, error } = useFetch('https://run.mocky.io/v3/534d1f3e-406e-4564-a506-7e2718fdb0bc');

  const handleOnInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.welcomeText}>
          <small className={classes.welcomeTextSmall}>
            Hi, User
          </small>
          What are you looking for today?
        </h3>
      </div>
      <NavLink to='/search'>
        <div className={classes.wrapper}>
          <Input 
            id={'searchBar'}
            type={'text'}
            name={'Search headphone'}
            element={<SearchIcon />}
            value={value}
            onInput={handleOnInput}       
          />
        </div>
      </NavLink>
      <section className={classes.showcase}>
        <Categories/>
        <Splide options={{
          autoWidth: true, 
          arrows: false, 
          pagination: false, 
          gap:'0.94rem',
        }}>
          {data && data.map((item) => (
            <SplideSlide key={item.id}>
              <Banner 
                key={item.id} 
                title={item.name} 
              />
            </SplideSlide>
          ))}
        </Splide>
        <div className={classes.showcaseText}>
          <h4>Featured Products</h4>
          <NavLink to='/products'>
            See All
          </NavLink>
        </div>
        <Splide options={{
          autoWidth: true, 
          arrows: false, 
          pagination: false, 
          gap:'0.94rem',
        }}>
          {data && data.map((item) => (
            <SplideSlide key={item.id}>
              <Card 
                key={item.id}
                name={item.name}
                price={item.price}
                rating={item.rating}
                showReview={false} 
              />
            </SplideSlide>
          ))} 
        </Splide>
      </section>
    </>
  )
}

export default Home
