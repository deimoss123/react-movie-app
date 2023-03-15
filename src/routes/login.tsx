import styles from '../styles/loginPage.module.scss';
import { useNavigate } from 'react-router-dom';

function TextInput({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} placeholder={placeholder} />
    </>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('test');
    navigate('/home');
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={onSubmit}>
        <TextInput name="email" label="Email" placeholder="email" />
        <TextInput name="password" label="Password" placeholder="password" />

        <button type="submit">Log in</button>
      </form>
      <form onSubmit={onSubmit}>
        <TextInput name="name" label="Name" placeholder="name" />
        <TextInput name="surname" label="Surname" placeholder="surname" />
        <TextInput name="email" label="Email" placeholder="email" />
        <TextInput name="email-again" label="Email again" placeholder="email" />
        <TextInput
          name="password"
          label="Password again"
          placeholder="password"
        />
        <TextInput
          name="password-again"
          label="Password"
          placeholder="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
