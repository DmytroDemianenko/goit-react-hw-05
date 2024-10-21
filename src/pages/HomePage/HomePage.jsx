import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movies) {
      return "Loading...";
    }
    const getTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={s.wrapper}>
      <h2>Trending today</h2>
      {isLoading && <p>Loading</p>}
      {error && <p>404</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default HomePage;
