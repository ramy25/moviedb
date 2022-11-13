import useHttp from '../../hooks/use-http';
import { getSingleMovie, getMovieConfiguration } from '../../lib/api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/loadingSpinner/LoadingSpinner';
import WatchlistButton from '../../components/watchlistButton/WatchlistButton';

const Movie = () => {
  const params = useParams();
  const { movieId } = params;

  const {
    sendRequest: getMovie,
    status: movieStatus,
    data: loadedMovie,
    error: movieError,
  } = useHttp(getSingleMovie, true);

  const {
    sendRequest: getMovieConfig,
    status: movieConfigStatus,
    data: movieConfig,
    error: movieConfigError,
  } = useHttp(getMovieConfiguration, true);

  useEffect(() => {
    getMovie(movieId);
    getMovieConfig();
  }, [getMovie, movieId, getMovieConfig]);

  if (movieStatus === 'pending') {
    return <LoadingSpinner status={movieStatus} />;
  }

  if (movieError) {
    return <p className="centered focused">{movieError}</p>;
  }

  if (
    movieStatus === 'completed' &&
    (!loadedMovie || loadedMovie.length === 0)
  ) {
    return <p>No movies found</p>;
  }

  return (
    <div>
      <h1>{loadedMovie.title}</h1>
      <LoadingSpinner status={movieConfigStatus} />
      {movieConfigStatus === 'completed' && (
        <img
          src={`${movieConfig.images.secure_base_url}/${movieConfig.images.poster_sizes[3]}/${loadedMovie.poster_path}`}
        />
      )}
      <p>{loadedMovie.overview}</p>
      <WatchlistButton
        movie={{
          title: loadedMovie.title,
          id: movieId,
          posterPath: loadedMovie.poster_path,
        }}
      />
    </div>
  );
};

export default Movie;
