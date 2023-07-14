import SearchItem from "../components/searchItem/SearchItem"
import SortBy from "../components/sortBy/SortBy";
import StarRating from "../components/starRating/StarRating";

const Search = () => {
  return (
    <div>
      <h2>Search</h2>
      <SearchItem />
      <SortBy />
      <StarRating />
    </div>
  );
}

export default Search
