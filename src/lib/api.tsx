const MOVIEDB_API = 'https://api.themoviedb.org/3';
const API_KEY = '735b3d18c2bc1830017e10f098cbe3ce';

export async function getPopularMovies(page: number = 1) {
  console.log(
    `${MOVIEDB_API}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const response = await fetch(
    `${MOVIEDB_API}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch movies.');
  }

  return {
    movies: [...data['results']],
    // seems we are limited to a maximum of 500 pages, don't know why
    // {"errors":["page must be less than or equal to 500"],"success":false}
    totalPages: data['total_pages'] > 500 ? 500 : data['total_pages'],
  };
}

export async function getSingleMovie(movieId: number) {
  const response = await fetch(
    `${MOVIEDB_API}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  return data;
}

export async function getMovieConfiguration() {
  const response = await fetch(
    `${MOVIEDB_API}/configuration?api_key=${API_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch movies.');
  }

  return data;
}

export async function getMultiSearch(search: string | null, page = 1) {
  if (!search) return { results: [] };

  const response = await fetch(
    `${MOVIEDB_API}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}&page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  console.log(
    `${MOVIEDB_API}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}&page=${page}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch movies.');
  }

  return data;
}
