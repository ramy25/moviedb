import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Movie from './pages/movie/Movie';
import Movies from './pages/movies/Movies';
import Discover from './pages/discover/Discover';
import RootLayout from './pages/layout/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/movies">
        <Route index element={<Movies />} />
        <Route path=":movieId" element={<Movie />} />
      </Route>
      <Route path="/discover" element={<Discover />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
