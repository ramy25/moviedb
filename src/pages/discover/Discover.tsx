import { useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { getMultiSearch } from '../../lib/api';
import { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
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

  console.log(multiSearchresults);
  return (
    <>
      <form onSubmit={searchSubmitHandler}>
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <label>Look up a movie, tv series or a person!</label>
          </Grid>
          <Grid item>
            <TextField
              label="Any search criteria!"
              variant="outlined"
              type="text"
              inputRef={searchInput}
            />
          </Grid>
          <Grid item mb={2}>
            <Button variant="contained" size="medium" type="submit">
              Start searching!
            </Button>
          </Grid>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={newResults}
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>

          {/* <ul>
            {getMultiSearchstatus === 'completed' &&
              multiSearchresults?.results.length > 0 &&
              multiSearchresults.results.map((el: any) => {
                return (
                  <li key={el.media_type + el.id}>
                    <h3>Name: {el[getTitleFromType(el.media_type)]}</h3>
                    <p>Type: {el.media_type}</p>
                  </li>
                );
              })}
          </ul> */}
        </Grid>
      </form>
    </>
  );
};

export default Discover;
