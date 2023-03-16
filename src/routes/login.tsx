import styles from '../styles/loginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { YourMovie } from './your-movies';
import useAuth from '../auth';

const TextInput = ({
  name,
  label,
  placeholder,
  onChange,
  formData,
}: {
  name: string;
  label: string;
  placeholder: string;
  formData: Record<string, string>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
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
    loginName: '',
    loginPassword: '',

    name: '',
    surname: '',
    email: '',
    emailAgain: '',
    password: '',
    passwordAgain: '',
  });
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: form validation
    console.log('Login');
    login().then(() => {
      navigate('/home');
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

    const local = localStorage.getItem('registeredUsers');
    const registeredUsers = local ? (JSON.parse(local) as User[]) : [];
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    login().then(() => {
      navigate('/home');
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
          label="Password again"
          placeholder="password"
          onChange={handleInputChange}
          formData={formData}
        />
        <TextInput
          name="passwordAgain"
          label="Password"
          placeholder="password"
          onChange={handleInputChange}
          formData={formData}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
