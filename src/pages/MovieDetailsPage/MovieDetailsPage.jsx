import React, { useEffect, useState } from "react";
import { fetchMovie } from "../../services/api";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = location.state ?? "/";
  useEffect(() => {
    const getMovieById = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovie(movieId);
        data.poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieById();
  }, [movieId]);

  if (!movie) {
    return "Loading...";
  }

  return (
    <>
      <Link to={backLinkHref}>Go back</Link>
      {movie && <img src={movie.poster} alt={movie.title} />}
      <h3> {movie.title}</h3>
      <p>User Score: {movie.popularity}</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      {/* <h3>Genres: {movie.genres}</h3> */}
      <h3>Additional information</h3>
      <div>
        <NavLink to="Cast">Cast</NavLink>
        <NavLink to="Reviews">Reviews</NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
