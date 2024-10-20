import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDA5NDg0OTAyYjBjOGEyM2Q3ZDBhMDA3MjFkODY0MyIsIm5iZiI6MTcyNzgxMDk1MC40NDM2NjQsInN1YiI6IjYxOTQxNTAzNDRlYTU0MDAyYmFjMTU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fIOcdkSyA8JpDFZU0FffJtgkEbSwkMfLNn64ftxD7ig",
  },
};

export const fetchMovies = async () => {
  const { data } = await axios.get(`/trending/movie/day`, options);

  return data;
};

export const fetchMovie = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`, options);

  return data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);

  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);

  return response.data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data.results;
};
