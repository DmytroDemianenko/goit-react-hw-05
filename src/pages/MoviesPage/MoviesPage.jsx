import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchSearchMovie } from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchParams.get("query") ?? "";
    if (!query) {
      return;
    }
    const getTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, [searchParams]);
  const handleChangeQuery = (query) => {
    setSearchParams({ query });
  };
  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
