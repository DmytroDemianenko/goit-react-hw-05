import { useSearchParams } from "react-router-dom";
import s from "./SearchBar.module.css";
const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { query } = form.elements;
    setSearchParams({ query: query.value });

    form.reset();
  };
  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          className={s.inputArea}
          type="text"
          name="query"
          placeholder="Please, enter searching title"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
