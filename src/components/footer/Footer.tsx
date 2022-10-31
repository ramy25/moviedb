import { Container } from '@mui/material';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer id={styles.footer}>
      <Container>
        <p>
          Made using{' '}
          <a
            target="_blank"
            href="https://developers.themoviedb.org/3/getting-started/introduction"
          >
            TheMovieDb API
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
