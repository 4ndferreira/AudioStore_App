import Categories from "../components/Categories"
import SearchBar from "../components/SearchBar"
import classes from './Home.module.css'

const Home = () => {
  return (
    <>
      <section className={classes.container}>
        <h4>Hi, User</h4>
        <h3>What are you looking for today?</h3>
      </section>
      <SearchBar />
      <Categories/>
    </>
  )
}

export default Home
