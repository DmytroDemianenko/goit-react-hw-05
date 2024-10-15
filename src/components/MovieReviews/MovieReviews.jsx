import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);
  if (!movieReviews) {
    return <p>No reviews yet</p>;
  }

  return (
    <>
      <ul>
        {isLoading && <p>Loading</p>}
        {error && <p>404</p>}
        {movieReviews.map(({ id, author, content }) => {
          if (author) {
            return (
              <li key={id}>
                <h3>Author: {author}</h3>
                <p> {content}</p>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default MovieReviews;
