import { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import defaultMovieList, { AvailableMovie } from '../movieList';
import styles from '../styles/homePage.module.scss';
import getCurrentUser from '../util/getCurrentUser';
import updateUser from '../util/updateUser';

export default function HomePage() {
  const [availableMovies, setAvailableMovies] = useState(
    localStorage.getItem('availableMovies')
      ? (JSON.parse(
          localStorage.getItem('availableMovies')!
        ) as AvailableMovie[])
      : defaultMovieList
  );

  const onRentClick = (movieName: string) => {
    // set available movies
    const newMovies = [...availableMovies];
    const movie = newMovies.find(m => m.name === movieName);
    if (!movie || movie.stock <= 0) return;
    movie.stock--;
    setAvailableMovies(newMovies);
    localStorage.setItem('availableMovies', JSON.stringify(newMovies));

    // set your movies
    const user = getCurrentUser();
    updateUser({
      rentedMovies: [
        ...user.rentedMovies,
        { name: movieName, hoursRented: 12 },
      ],
    });
  };

  return (
    <>
      <Header />
      <div className={styles.homePage}>
        <div className={styles.movieList}>
          <h2>Available Movies</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Price for 12h</th>
                <th>Is in stock</th>
              </tr>
            </thead>
            <tbody>
              {availableMovies.map(movie => (
                <tr key={movie.name}>
                  <td>{movie.name}</td>
                  <td>{movie.genre}</td>
                  <td>${movie.rentalPrice}</td>
                  <td>{movie.stock > 0 ? `yes (${movie.stock})` : 'no'}</td>
                  <td>
                    <Button
                      text={`Rent`}
                      disabled={movie.stock <= 0}
                      className={styles.rentBtn}
                      onClick={() => onRentClick(movie.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
