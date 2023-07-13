import Categories from "../../components/categories/Categories"
import SearchBar from "../../components/searchBar/SearchBar"
import classes from './Home.module.css'

const Home = () => {
  return (
    <>
      <h3 className={classes.welcomeText}>
        <small className={classes.welcomeTextSmall}>
          Hi, User
        </small>
        What are you looking for today?
      </h3>
      <SearchBar />
      <div className={classes.showcase}>
        <Categories/>
        <div>
          <h4>Featured Products</h4>
          <a href="">See All</a>
        </div>
      </div>
    </>
  )
}

export default Home
