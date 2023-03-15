export interface AvailableMovie {
  name: string;
  genre: string;
  rentalPrice: number;
  stock: number;
}

const defaultMovieList: AvailableMovie[] = [
  {
    name: 'Shrek',
    genre: 'Comedy',
    rentalPrice: 2.77,
    stock: 3,
  },
  {
    name: 'Shrek 2',
    genre: 'Comedy',
    rentalPrice: 2.97,
    stock: 1,
  },
  {
    name: 'Shrek The Third',
    genre: 'Comedy',
    rentalPrice: 3.04,
    stock: 2,
  },
  {
    name: 'Shrek Forever After',
    genre: 'Comedy',
    rentalPrice: 3.17,
    stock: 1,
  },
];

export default defaultMovieList;
