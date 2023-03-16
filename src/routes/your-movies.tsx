import { useState } from 'react';
import Header from '../components/Header';
import defaultMovieList, { AvailableMovie } from '../movieList';
import styles from '../styles/yourMoviesPage.module.scss';
import getCurrentUser from '../util/getCurrentUser';
import updateUser from '../util/updateUser';

export interface YourMovie {
  name: string;
  hoursRented: number;
}

export default function YourMoviesPage() {
  const user = getCurrentUser();
  const [yourMovies, setYourMovies] = useState<YourMovie[]>(user.rentedMovies);

  const onRemoveClick = (index: number, movieName: string) => {
    // set your movies
    const newMovies = yourMovies.filter((_, i) => i !== index);
    setYourMovies(newMovies);
    updateUser({ rentedMovies: newMovies });

    // set available movies
    const local = localStorage.getItem('availableMovies');
    const availableMovies = local
      ? (JSON.parse(local) as AvailableMovie[])
      : defaultMovieList;
    const movie = availableMovies.find(m => m.name === movieName);
    if (!movie) return;
    movie.stock++;
    localStorage.setItem('availableMovies', JSON.stringify(availableMovies));
  };

  const changeRentTime = (index: number, hours: number) => {
    if (hours < 0 && yourMovies[index].hoursRented <= 12) return;
    if (hours > 0 && yourMovies[index].hoursRented >= 168) return;
    const newMovies = [...yourMovies];
    newMovies[index].hoursRented += hours;
    setYourMovies(newMovies);
    updateUser({ rentedMovies: newMovies });
  };

  return (
    <>
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
                  <td className={styles.timeCol}>
                    <button onClick={() => changeRentTime(index, -12)}>
                      {'<'}
                    </button>
                    {movie.hoursRented}h
                    <button onClick={() => changeRentTime(index, 12)}>
                      {'>'}
                    </button>
                  </td>
                  <td>${price.toFixed(2)}</td>
                  <td>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onRemoveClick(index, movie.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
