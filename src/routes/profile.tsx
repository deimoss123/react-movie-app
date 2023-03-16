import { useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/profilePage.module.scss';
import updateUser from '../util/updateUser';
import { User } from './login';

function getCurrentUser(): User {
  return JSON.parse(localStorage.getItem('currentUser')!) as User;
}

export default function ProfilePage() {
  const user = getCurrentUser();
  const [email, setEmail] = useState(user.email);

  const resetPassword = () => {
    console.log('reset password');
  };

  const resetEmail = () => {
    const promptRes = prompt('New Email');
    if (!promptRes) return;
    updateUser({ email: promptRes });
    setEmail(promptRes);
  };

  return (
    <>
      <Header />
      <div className={styles.profile}>
        <h3>Profile</h3>
        <p>
          <span className={styles.bold}>Name: </span>
          {user.name}
        </p>
        <p>
          <span className={styles.bold}>Surname: </span>
          {user.surname}
        </p>
        <p>
          <span className={styles.bold}>Email: </span>
          {email}
        </p>
        <div className={styles.buttonRow}>
          <button onClick={resetPassword}>Reset password</button>
          <button onClick={resetEmail}>Reset email</button>
        </div>
      </div>
    </>
  );
}
