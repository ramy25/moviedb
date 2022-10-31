import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

function RootLayout() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <Container>
          <Box my={5}>
            <Outlet />
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
