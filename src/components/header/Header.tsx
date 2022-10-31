import { Container } from '@mui/material';
import styles from './Header.module.css';

type Props = {
  children?: React.ReactNode;
};

const Header: React.FC<Props> = (props) => {
  return (
    <header id={styles.header}>
      <Container>{props.children}</Container>
    </header>
  );
};

export default Header;
