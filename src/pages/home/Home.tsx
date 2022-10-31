import MovieList from '../../components/movieList/MovieList';
import useHttp from '../../hooks/use-http';
import { getPopularMovies, getMultiSearch } from '../../lib/api';
import { useEffect } from 'react';

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
        <p>Loading</p>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
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
