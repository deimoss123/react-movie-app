import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <>
      <h1 className="pageTitle">Movie Rental</h1>
      <Outlet />
      <Footer />
    </>
  );
}
