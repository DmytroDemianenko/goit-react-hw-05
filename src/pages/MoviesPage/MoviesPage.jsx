import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchSearchMovie } from "../../services/api";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchSearchMovie();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, []);
  if (!movies) {
    return "Loading...";
  }

  return (
    <div>
      <h2>Movies</h2>
      <input type="text" />
      <button type="submit">Search</button>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
