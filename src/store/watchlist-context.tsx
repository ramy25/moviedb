import React from 'react';

const Watchlist = React.createContext({
  movies: [],
  addMovie: (movie: any) => {},
  removeMovie: (id: number) => {},
});

export default Watchlist;
