import { useContext } from 'react';
import WatchlistContext from '../../store/watchlist-context';
import MovieList from '../../components/movieList/MovieList';

const Watchlist = () => {
  const watchlistCtx = useContext(WatchlistContext);

  console.log(watchlistCtx.movies);

  if (watchlistCtx.movies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <>
      <h1>Watchlist page</h1>
      <MovieList movies={watchlistCtx.movies} />
    </>
  );
};

export default Watchlist;
