import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCastsById = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCastsById();
  }, [movieId]);
  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  if (movieCast.length === 0) {
    return <p>No casts</p>;
  } else {
    return (
      <ul>
        {movieCast.map(({ id, name, profile_path, character }) => {
          return (
            <li key={id}>
              <img
                src={profile_path ? baseUrl + profile_path : null}
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default MovieCast;
