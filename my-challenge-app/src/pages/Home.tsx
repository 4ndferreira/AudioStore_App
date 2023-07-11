import SearchBar from "../components/SearchBar"
import classes from './Home.module.css'

const Home = () => {
  return (
    <>
      <section className={classes.container}>
        <h4>Hi, Name</h4>
        <h3>What are you looking for today?</h3>
      </section>
      <SearchBar />
    </>
  )
}

export default Home
