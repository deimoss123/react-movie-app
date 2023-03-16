import styles from '../styles/loginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { YourMovie } from './your-movies';
import useAuth from '../auth';
import getRegisteredUsers from '../util/getRegisteredUsers';

function TextInput({
  name,
  label,
  placeholder,
  type,
  formData,
  onChange,
  className,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  formData: Record<string, string>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type || 'text'}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={formData ? formData[name] : ''}
        className={className}
      />
    </>
  );
}

// some random email regex i found on google, probably not safe
const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export interface InputFieldOptions {
  name: string;
  label: string;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  validateFunc: (
    inputValue: string,
    formData: Record<string, string>
  ) => { valid: true } | { valid: false; msg: string };
}

const inputFields: InputFieldOptions[] = [
  // {
  //   name: 'loginEmail',
  //   label: 'Email',
  //   placeholder: 'email',
  //   validateFunc: inputValue => {
  //     if (!emailRegex.test(inputValue)) {
  //       return { valid: false, msg: 'Invalid email' };
  //     }
  //     return { valid: true };
  //   },
  // },
  // {
  //   name: 'loginPassword',
  //   label: 'Password',
  //   placeholder: 'password',
  //   type: 'password',
  //   validateFunc: inputValue => {
  //     if (inputValue.length < 2) {
  //       return { valid: false, msg: 'Must be 8 or more symbols long' };
  //     }
  //     return { valid: true };
  //   },
  // },
  {
    name: 'name',
    label: 'Name',
    placeholder: 'name',
    validateFunc: inputValue => {
      if (inputValue.length < 2) {
        return { valid: false, msg: 'Must contain at least 2 letters' };
      }
      return { valid: true };
    },
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'surname',
    validateFunc: inputValue => {
      if (inputValue.length < 2) {
        return { valid: false, msg: 'Must contain at least 2 letters' };
      }
      return { valid: true };
    },
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'email',
    validateFunc: inputValue => {
      if (!emailRegex.test(inputValue)) {
        return { valid: false, msg: 'Invalid email' };
      }
      return { valid: true };
    },
  },
  {
    name: 'emailAgain',
    label: 'Email again',
    placeholder: 'email',
    validateFunc: (inputValue, formData) => {
      if (inputValue !== formData.email) {
        return { valid: false, msg: 'Emails must match' };
      }
      return { valid: true };
    },
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'password',
    type: 'password',
    validateFunc: inputValue => {
      if (inputValue.length < 8) {
        return { valid: false, msg: 'Must be 8 or more symbols long' };
      }
      return { valid: true };
    },
  },
  {
    name: 'passwordAgain',
    label: 'Password again',
    placeholder: 'password',
    type: 'password',
    validateFunc: (inputValue, formData) => {
      if (inputValue !== formData.password) {
        return { valid: false, msg: 'Passwords must match' };
      }
      return { valid: true };
    },
  },
];

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  rentedMovies: YourMovie[];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({
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
        {inputFields.map(field => {
          const validation = field.validateFunc(formData[field.name], formData);
          const isInvalid = !!formData[field.name].length && !validation.valid;

          return (
            <div className={styles.inputWrapper}>
              <TextInput
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                onChange={handleInputChange}
                formData={formData}
                className={
                  formData[field.name].length
                    ? isInvalid
                      ? styles.invalidInput
                      : styles.validInput
                    : ''
                }
                type={field.type}
              />
              {isInvalid && (
                <span className={styles.errMsg}>{validation.msg}</span>
              )}
            </div>
          );
        })}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
