import React from 'react';

const WatchlistContext = React.createContext({
  movies: ([] = []),
  addMovie: (movie: any) => {},
  removeMovie: (id: any) => {},
});

export default WatchlistContext;
