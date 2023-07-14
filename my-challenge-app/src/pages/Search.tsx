import Review from "../components/review/Review";
import SearchItem from "../components/searchItem/SearchItem"
import SortBy from "../components/sortBy/SortBy";

const Search = () => {
  return (
    <div>
      <h2>Search</h2>
      <SearchItem />
      <SortBy />
      <Review />
    </div>
  );
}

export default Search
