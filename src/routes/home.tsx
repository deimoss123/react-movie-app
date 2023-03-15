import Header from '../components/Header';
import styles from '../styles/homePage.module.scss';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className={styles.homePage}>
        <div className={styles.movieList}>
          <table>
            <caption>Available Movies</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Price for 12h</th>
                <th>Is in stock</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Batman</td>
                <td>Action</td>
                <td>4.55$</td>
                <td>yes</td>
                <td>
                  <button>Rent</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
