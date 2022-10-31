import { Grid, Grow } from '@mui/material';
import { Link } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getMovieConfiguration } from '../../lib/api';
import { useEffect } from 'react';

type Movie = {
  movieId: number;
  movieTitle: string;
  moviePosterPath: string;
};

const MovieCard = ({ movieId, movieTitle, moviePosterPath }: Movie) => {
  const {
    sendRequest: getMovieConfig,
    status: movieConfigStatus,
    data: movieConfig,
    error: movieConfigError,
  } = useHttp(getMovieConfiguration, true);

  useEffect(() => {
    getMovieConfig();
  }, [getMovieConfig]);

  return (
    <Grid item xs={2}>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 2000 }}
      >
        <Link to={`/movies/${movieId.toString()}`}>
          {movieConfigStatus === 'completed' && (
            <img
              src={`${movieConfig.images.secure_base_url}/${movieConfig.images.poster_sizes[1]}/${moviePosterPath}`}
            />
          )}
          <p>{movieTitle}</p>
        </Link>
      </Grow>
    </Grid>
  );
};

export default MovieCard;
