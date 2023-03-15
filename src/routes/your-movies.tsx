import { useState } from 'react';
import Header from '../components/Header';
import defaultMovieList, { AvailableMovie } from '../movieList';
import styles from '../styles/yourMoviesPage.module.scss';

interface YourMovie {
  name: string;
  hoursRented: number;
}

export default function YourMoviesPage() {
  const [yourMovies, setYourMovies] = useState<YourMovie[]>(
    localStorage.getItem('yourMovies')
      ? (JSON.parse(localStorage.getItem('yourMovies')!) as YourMovie[])
      : []
  );

  const onRemoveClick = (movieName: string, index: number) => {
    // set your movies
    const newMovies = yourMovies.filter((_, i) => i !== index);
    setYourMovies(newMovies);
    localStorage.setItem('yourMovies', JSON.stringify(newMovies));

    // set available movies
    const availableMovies = localStorage.getItem('availableMovies')
      ? (JSON.parse(
          localStorage.getItem('availableMovies')!
        ) as AvailableMovie[])
      : defaultMovieList;
    const movie = availableMovies.find(m => m.name === movieName);
    if (!movie) return;
    movie.stock++;
    localStorage.setItem('availableMovies', JSON.stringify(availableMovies));
  };

  return (
    <div>
      <Header />
      <div className={styles.yourMovies}>
        <table>
          <caption>Your movies</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {yourMovies.map((movie, index) => {
              const data = defaultMovieList.find(m => m.name === movie.name);
              const price = (movie.hoursRented / 12) * (data?.rentalPrice || 0);

              return (
                <tr key={index}>
                  <td>{movie.name}</td>
                  <td>{data?.genre}</td>
                  <td>{movie.hoursRented}h</td>
                  <td>${price}</td>
                  <td>
                    <button onClick={() => onRemoveClick(movie.name, index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
