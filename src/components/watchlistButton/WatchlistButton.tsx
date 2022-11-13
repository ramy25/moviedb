import { Button } from '@mui/material';
import { useContext } from 'react';

import WatchlistContext from '../../store/watchlist-context';

const WatchlistButton = (props: any) => {
  const watchlistCtx = useContext(WatchlistContext);

  console.log(watchlistCtx);

  const isInWatchlist =
    watchlistCtx.movies.findIndex(
      (movie: any) => movie.id === props.movie.id
    ) !== -1;

  const addOrRemoveFromWatchlist = () => {
    if (!isInWatchlist) {
      watchlistCtx.addMovie({
        title: props.movie.title,
        id: props.movie.id,
        poster_path: props.movie.posterPath,
      });
    } else {
      watchlistCtx.removeMovie(props.movie.id);
    }
  };

  return (
    <Button variant="contained" onClick={addOrRemoveFromWatchlist}>
      {isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    </Button>
  );
};

export default WatchlistButton;
