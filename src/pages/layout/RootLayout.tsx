import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import WatchlistProvider from '../../store/WatchlistProvider';

function RootLayout() {
  return (
    <WatchlistProvider>
      <Header>
        <Navigation />
      </Header>
      <main>
        <Container
          sx={{ flexDirection: 'column', height: '100%', display: 'flex' }}
        >
          <Box
            my={5}
            style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
          >
            <Outlet />
          </Box>
        </Container>
      </main>
      <Footer />
    </WatchlistProvider>
  );
}

export default RootLayout;
