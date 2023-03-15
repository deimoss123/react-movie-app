import { useState } from 'react';
import Header from '../components/Header';
import defaultMovieList, { AvailableMovie } from '../movieList';
import styles from '../styles/homePage.module.scss';

export default function HomePage() {
  const [availableMovies, setAvailableMovies] = useState(
    localStorage.getItem('availableMovies')
      ? (JSON.parse(
          localStorage.getItem('availableMovies')!
        ) as AvailableMovie[])
      : defaultMovieList
  );

  const onRentClick = (movieName: string) => {
    const newMovies = [...availableMovies];
    const movie = newMovies.find(m => m.name === movieName);
    if (!movie || movie.stock <= 0) return;
    movie.stock--;
    setAvailableMovies(newMovies);
    localStorage.setItem('availableMovies', JSON.stringify(newMovies));
  };

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
              {availableMovies.map(movie => (
                <tr key={movie.name}>
                  <td>{movie.name}</td>
                  <td>{movie.genre}</td>
                  <td>${movie.rentalPrice}</td>
                  <td>{movie.stock > 0 ? 'yes' : 'no'}</td>
                  <td>
                    <button onClick={() => onRentClick(movie.name)}>
                      Rent ({movie.stock})
                    </button>
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
