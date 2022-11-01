import { useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { getMultiSearch } from '../../lib/api';
import { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

const getTitleFromType = (type: string) => {
  if (type === 'movie') return 'title';

  return 'name';
};

const getKnownForTitles = (knownFor: any) => {
  let titles = '';

  for (const [i, movie] of knownFor.entries()) {
    if (i !== knownFor.length - 1)
      titles += movie[getTitleFromType(movie.media_type)] + ', ';
    else titles += movie.title;
  }

  return titles;
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Name', width: 250 },
  { field: 'col2', headerName: 'Type', width: 250 },
  { field: 'col3', headerName: 'Overview', width: 250 },
  { field: 'col4', headerName: 'Known for', width: 250 },
];

const Discover: React.FC = () => {
  const [discoverString, setDiscoverString] = useState<string>('');
  const searchInput = useRef<HTMLInputElement | null>(null);
  const newResults = [];

  const {
    sendRequest: getMultiSearchResults,
    status: getMultiSearchstatus,
    data: multiSearchresults,
    error: multiSearchError,
  } = useHttp(getMultiSearch, true);

  const searchSubmitHandler = (e: any) => {
    e.preventDefault();

    if (searchInput.current) {
      setDiscoverString(searchInput.current.value);
    }
  };

  useEffect(() => {
    getMultiSearchResults(encodeURIComponent(discoverString));
  }, [getMultiSearchResults, discoverString]);

  if (
    getMultiSearchstatus === 'completed' &&
    multiSearchresults?.results.length
  ) {
    for (const result of multiSearchresults.results) {
      newResults.push({
        id: result.media_type + result.id,
        col1: result[getTitleFromType(result.media_type)],
        col2: result.media_type,
        col3: result.media_type !== 'person' ? result.overview : '-',
        col4:
          result.media_type === 'person'
            ? getKnownForTitles(result.known_for)
            : '-',
      });
    }
  }

  console.log(getMultiSearchstatus);
  const loadingStatus = getMultiSearchstatus === 'pending' ? true : false;

  return (
    <>
      <form onSubmit={searchSubmitHandler}>
        <Box mb={5}>
          <h3>Look up a movie, tv series or a person!</h3>
          <TextField
            label="Any search criteria!"
            variant="outlined"
            type="text"
            inputRef={searchInput}
          />
        </Box>
        <Box mb={5}>
          <LoadingButton
            variant="contained"
            size="medium"
            type="submit"
            loading={loadingStatus}
          >
            Start searching!
          </LoadingButton>
        </Box>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={newResults}
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </form>
    </>
  );
};

export default Discover;
