import { useState } from 'react';
import { Alert, Container, Image } from 'react-bootstrap';
import { userLogin } from '../redux/reducers/login';
import { CustomInput, InputTypes } from './shared/custom-input';
import { LoadingSpinner } from './shared/loading-spinner';
import { useAppDispatch, useAppSelector } from '../shared/custom-hooks';
import { Link } from 'react-router-dom';
import { routes } from '../shared/constants';
import { useForm, Controller } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/login.module.css';

export type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(userLogin(data)).unwrap();
    } catch (err) {
      setError(err?.message);

      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container className={styles.container}>
            <div className={styles.loginWrapper}>
              <Image className={styles.img} fluid src="/logo192.png" />
              <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <CustomInput
                      inputType={InputTypes.TEXT}
                      type="email"
                      label="Email"
                      placeholder="Enter email"
                      error={errors.email?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <CustomInput
                      inputType={InputTypes.TEXT}
                      type="password"
                      label="Password"
                      placeholder="Enter password"
                      error={errors.password?.message}
                      {...field}
                    />
                  )}
                />

                <div className="d-grid gap-2">
                  <Button
                    className="mt-1"
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                  >
                    Login
                  </Button>
                </div>
                <Link
                  className="d-flex justify-content-center"
                  to={routes.REGISTER}
                >
                  <p className="text-center mt-3 small letter-spacing-4">
                    Don't have an account, Register now
                  </p>
                </Link>
                {error && (
                  <Alert className="mt-3" variant="danger">
                    {error}
                  </Alert>
                )}
              </Form>
            </div>
          </Container>
        </>
      )}
    </>
  );
};
