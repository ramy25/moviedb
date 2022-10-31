import useHttp from '../../hooks/use-http';
import { getSingleMovie, getMovieConfiguration } from '../../lib/api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  //console.log('params', params);
  console.log('loadedMovie', loadedMovie);
  console.log('movieconfig', movieConfig);
  //console.log(loadedMovie);

  useEffect(() => {
    getMovie(movieId);
    getMovieConfig();
  }, [getMovie, movieId, getMovieConfig]);

  if (movieStatus === 'pending') {
    return (
      <div className="centered">
        <p>Loading</p>
      </div>
    );
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
    <>
      <h1>{loadedMovie.title}</h1>
      {movieConfigStatus === 'completed' && (
        <img
          src={`${movieConfig.images.secure_base_url}/${movieConfig.images.poster_sizes[3]}/${loadedMovie.poster_path}`}
        />
      )}
      <p>{loadedMovie.overview}</p>
    </>
  );
};

export default Movie;
