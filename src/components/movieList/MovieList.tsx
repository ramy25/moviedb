import { Grid } from '@mui/material';
import MovieCard from '../movieCard/MovieCard';

type MovieList = {
  movies: [];
};

const MovieList = ({ movies }: MovieList) => {
  console.log('movies', movies);
  return (
    <>
      <Grid container spacing={2}>
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
