import { User } from '../routes/login';

export default function getRegisteredUsers(): User[] {
  const local = localStorage.getItem('registeredUsers');
  return local ? JSON.parse(local) : [];
}
