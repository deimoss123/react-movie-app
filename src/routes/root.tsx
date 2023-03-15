import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <>
      root element
      <Outlet />
      <Footer />
    </>
  );
}
