import React, { useEffect, useState } from "react";
import { fetchMovie } from "../../services/api";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";

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
      <div className={s.wrapper}>
        <div className={s.thumbImg}>
          <Link className={s.goBack} to={backLinkHref}>
            <IoIosArrowRoundBack />
            Go back
          </Link>
          {movie && <img src={movie.poster} alt={movie.title} width={250} />}
        </div>
        <div className={s.thumbAbout}>
          <h3> {movie.title}</h3>
          <p>User Score: {movie.popularity}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <ul>
            <h3>Genres</h3>
            {movie.genres?.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.thumbAdditional}>
        <h3>Additional information</h3>
        <div className={s.thumbAdditional}>
          <NavLink to="Cast">Cast</NavLink>
          <NavLink to="Reviews">Reviews</NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
