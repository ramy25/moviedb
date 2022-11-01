import MovieList from '../../components/movieList/MovieList';
import useHttp from '../../hooks/use-http';
import { getPopularMovies } from '../../lib/api';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const {
    sendRequest,
    status,
    data: loadedMovies,
    error,
  } = useHttp(getPopularMovies, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  console.log(loadedMovies);

  if (status === 'pending') {
    return (
      <div className="centered">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <h1 className="centered">{error}</h1>;
  }

  if (
    status === 'completed' &&
    (!loadedMovies.movies || loadedMovies.movies.length === 0)
  ) {
    return <p>No movies found</p>;
  }

  return (
    <>
      <h1>These are the most popular movies at the moment!</h1>

      <MovieList movies={loadedMovies.movies} />
    </>
  );
};

export default Home;
