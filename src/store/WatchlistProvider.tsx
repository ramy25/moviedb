import { useReducer } from 'react';
import WatchlistContext from './watchlist-context';

const defaultWatchlistState = {
  movies: JSON.parse(localStorage.getItem('movies') || '[]'),
};

const watchlistReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_MOVIE': {
      const updatedMovies = state.movies.concat(action.movie);
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return {
        movies: updatedMovies,
      };
    }
    case 'REMOVE_MOVIE': {
      let updatedMovies = [...state.movies];
      console.log('action', action.id);
      const indexOfRemovedMovie = state.movies.findIndex(
        (movie: any) => movie.id === action.id
      );

      console.log(indexOfRemovedMovie);

      if (indexOfRemovedMovie !== -1) {
        updatedMovies[indexOfRemovedMovie] =
          updatedMovies[updatedMovies.length - 1];

        updatedMovies.pop();

        localStorage.setItem('movies', JSON.stringify(updatedMovies));

        return {
          movies: updatedMovies,
        };
      }
    }
  }
  return defaultWatchlistState;
};

const WatchlistProvider = (props: any) => {
  const [watchlistState, dispatchWatchlistAction] = useReducer(
    watchlistReducer,
    defaultWatchlistState
  );

  const addMovieToWatchlistHandler = (movie: any) => {
    dispatchWatchlistAction({ type: 'ADD_MOVIE', movie: movie });
  };

  const removeMovieFromWatchlistHandler = (id: any) => {
    dispatchWatchlistAction({ type: 'REMOVE_MOVIE', id });
  };

  const watchlistContext = {
    movies: watchlistState.movies,
    addMovie: addMovieToWatchlistHandler,
    removeMovie: removeMovieFromWatchlistHandler,
  };

  return (
    <WatchlistContext.Provider value={watchlistContext}>
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
