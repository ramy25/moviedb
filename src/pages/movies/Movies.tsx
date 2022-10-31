import MovieList from '../../components/movieList/MovieList';
import { getPopularMovies } from '../../lib/api';
import useHttp from '../../hooks/use-http';
import { useEffect, useState } from 'react';
import { Stack, Pagination, Box, TextField, Button } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const filterMovies = (movies: any, searchTerm: any) => {
  return movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
};

const sortMovies = (movies: any, ascending: any) => {
  return movies.sort((movieA: any, movieB: any) => {
    if (ascending) {
      return movieA.title > movieB.title ? 1 : -1;
    } else {
      return movieA.title < movieB.title ? 1 : -1;
    }
  });
};

const Movies = () => {
  const [page, setPage] = useState(1);
  const [totalNrOfPages, setTotalNrOfPages] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  let sortedMovies = [];
  let moviesToShow = [];

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const {
    sendRequest,
    status,
    data: loadedMovies,
    error,
  } = useHttp(getPopularMovies, true);

  useEffect(() => {
    sendRequest(page);
  }, [sendRequest, page]);

  useEffect(() => {
    if (status === 'completed' && initialLoad) {
      setTotalNrOfPages(loadedMovies.totalPages);
      setInitialLoad(false);
    }
  }, [status, initialLoad]);

  const pageClickHandler = (
    event: React.ChangeEvent<unknown>,
    selectedPage: number
  ): void => {
    setPage(selectedPage);
  };

  const filterOnChangeHandler = (e: any) => {
    const searchTerm = e.target.value;
    setSearchFilter(searchTerm);
  };

  const changeSortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  if (status === 'completed' && loadedMovies.movies.length !== 0) {
    console.log(loadedMovies.movies);
    sortedMovies = sortMovies(loadedMovies.movies, isSortingAscending);
    moviesToShow =
      searchFilter === ''
        ? sortedMovies
        : filterMovies(sortedMovies, searchFilter);
  }

  if (
    status === 'completed' &&
    (!loadedMovies.movies || loadedMovies.movies.length === 0)
  ) {
    return <p>No movies found</p>;
  }

  return (
    <>
      <div>
        {error && <p className="centered focused">{error}</p>}
        <Box mb={5}>
          <h3>Search through movies</h3>
          <TextField
            label="Movie title..."
            variant="outlined"
            type="text"
            onChange={filterOnChangeHandler}
            value={searchFilter}
          />
        </Box>

        {status === 'completed' && (
          <>
            <Box mb={5}>
              <Button
                variant="contained"
                size="medium"
                onClick={changeSortingHandler}
              >
                Sort Movies {isSortingAscending ? 'desc' : 'asc'}
              </Button>
            </Box>
            <MovieList movies={moviesToShow} />
          </>
        )}

        {!initialLoad && (
          <Stack spacing={2}>
            <Pagination
              onChange={pageClickHandler}
              count={totalNrOfPages}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        )}
      </div>
    </>
  );
};
export default Movies;
