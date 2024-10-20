import { useSearchParams } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="query" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
