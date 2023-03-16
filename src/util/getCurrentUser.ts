import { User } from '../routes/login';

export default function getCurrentUser(): User {
  return JSON.parse(localStorage.getItem('currentUser')!) as User;
}
