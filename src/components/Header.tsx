import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../auth';
import styles from './Header.module.scss';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogoutBtn = () => {
    logout().then(() => {
      localStorage.removeItem('currentUser');
      navigate('/login', { replace: true });
    });
  };

  return (
    <header className={styles.header}>
      <Link to="/home">Home</Link>
      <Link to="/your-movies">Your Movies</Link>
      <Link to="/profile">Profile</Link>
      <button className={styles.logoutBtn} onClick={handleLogoutBtn}>
        Log out
      </button>
    </header>
  );
}
