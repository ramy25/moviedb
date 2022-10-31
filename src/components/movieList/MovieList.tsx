import { Grid } from '@mui/material';
import MovieCard from '../movieCard/MovieCard';

type MovieList = {
  movies: [];
};

const MovieList = ({ movies }: MovieList) => {
  return (
    <>
      <Grid container spacing={0}>
        {movies?.map((movie: any) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            movieTitle={movie.title}
            moviePosterPath={movie.poster_path}
          />
        ))}
      </Grid>
    </>
  );
};

export default MovieList;
