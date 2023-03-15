import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/home">Home</Link>
      <Link to="/your-movies">Your Movies</Link>
      <Link to="/profile">Profile</Link>
    </header>
  );
}
