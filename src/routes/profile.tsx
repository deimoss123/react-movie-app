import { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import styles from '../styles/profilePage.module.scss';
import getCurrentUser from '../util/getCurrentUser';
import updateUser from '../util/updateUser';

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
        <h2>Profile</h2>
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
          <Button text="Reset password" onClick={resetPassword} />
          <Button text="Reset email" onClick={resetEmail} />
        </div>
      </div>
    </>
  );
}
