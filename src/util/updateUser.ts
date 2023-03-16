import { User } from '../routes/login';

export default function updateUser(update: Partial<User>) {
  const local = localStorage.getItem('currentUser');
  if (!local) return;
  const currentUser = JSON.parse(local) as User;
  const newUser = { ...currentUser, ...update };
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  const usersLocal = localStorage.getItem('registeredUsers');
  if (!usersLocal) return;
  const registeredUsers = JSON.parse(usersLocal) as User[];
  const index = registeredUsers.findIndex(
    user => user.email === currentUser.email
  )!;
  registeredUsers[index] = newUser;
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
}
