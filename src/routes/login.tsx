import styles from '../styles/loginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { YourMovie } from './your-movies';
import useAuth from '../auth';
import getRegisteredUsers from '../util/getRegisteredUsers';

const TextInput = ({
  name,
  label,
  placeholder,
  onChange,
  formData,
  type,
}: {
  name: string;
  label: string;
  placeholder: string;
  formData: Record<string, string>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      type={type || 'text'}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={formData ? formData[name] : ''}
    />
  </>
);

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  rentedMovies: YourMovie[];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',

    name: '',
    surname: '',
    email: '',
    emailAgain: '',
    password: '',
    passwordAgain: '',
  });
  const { login, authed } = useAuth();

  useEffect(() => {
    if (authed) navigate('/home', { replace: true });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: form validation
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(
      user => user.email === formData.loginEmail
    );
    if (!foundUser) {
      // TODO: show that user is not registered
      alert('user not registered');
      return;
    }

    if (foundUser.password !== formData.loginPassword) {
      // TODO: incorrect password
      alert('incorrect password');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    login().then(() => {
      navigate('/home', { replace: true });
    });
  };

  const onSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: form validation
    const newUser: User = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      rentedMovies: [],
    };

    const registeredUsers = getRegisteredUsers();
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    login().then(() => {
      navigate('/home', { replace: true });
    });
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={onSubmitLogin}>
        <TextInput
          name="loginEmail"
          label="Email"
          placeholder="email"
          onChange={handleInputChange}
          formData={formData}
        />
        <TextInput
          name="loginPassword"
          label="Password"
          placeholder="password"
          onChange={handleInputChange}
          formData={formData}
          type="password"
        />

        <button type="submit">Log in</button>
      </form>
      <form onSubmit={onSubmitRegister}>
        <TextInput
          name="name"
          label="Name"
          placeholder="name"
          onChange={handleInputChange}
          formData={formData}
        />
        <TextInput
          name="surname"
          label="Surname"
          placeholder="surname"
          onChange={handleInputChange}
          formData={formData}
        />
        <TextInput
          name="email"
          label="Email"
          placeholder="email"
          onChange={handleInputChange}
          formData={formData}
        />
        <TextInput
          name="emailAgain"
          label="Email again"
          placeholder="email"
          onChange={handleInputChange}
          formData={formData}
        />
        <TextInput
          name="password"
          label="Password"
          placeholder="password"
          onChange={handleInputChange}
          formData={formData}
          type="password"
        />
        <TextInput
          name="passwordAgain"
          label="Password again"
          placeholder="password"
          onChange={handleInputChange}
          formData={formData}
          type="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
