import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/register.module.css';
import { CustomInput, InputTypes } from './shared/custom-input';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: FileList;
}

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      photos: undefined,
    },
  });

  const [error, setError] = useState('');

  const onSubmit = async (data: FormData) => {
    if (data.photos.length < 4) {
      setError('At least 4 photos should be selected.');
      return;
    }
  };

  return (
    <Container className={styles.container}>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: 'First name is required',
            minLength: {
              value: 2,
              message: 'First name must be at least 2 characters',
            },
            maxLength: {
              value: 25,
              message: 'First name must be at most 25 characters',
            },
          }}
          render={({ field }) => (
            <CustomInput
              inputType={InputTypes.TEXT}
              type="text"
              label="First Name"
              placeholder="Enter first name"
              error={errors.firstName?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: 'Last name is required',
            minLength: {
              value: 2,
              message: 'Last name must be at least 2 characters',
            },
            maxLength: {
              value: 25,
              message: 'Last name must be at most 25 characters',
            },
          }}
          render={({ field }) => (
            <CustomInput
              inputType={InputTypes.TEXT}
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              error={errors.lastName?.message}
              {...field}
            />
          )}
        />

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
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 50,
              message: 'Password must be at most 50 characters',
            },
            pattern: {
              value: /^(?=.*\d).{6,50}$/,
              message: 'Password must contain at least one number',
            },
          }}
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

        <Controller
          name="photos"
          control={control}
          rules={{ required: 'At least 4 photos are required' }}
          render={({ field }) => (
            <CustomInput
              inputType={InputTypes.FILE}
              name="photos"
              label="Photos"
              error={errors.photos?.message}
              value={
                field.value
                  ? Array.from(field.value)
                      .map((file) => file.name)
                      .join(', ')
                  : ''
              }
              onChange={(e) => field.onChange(e.target.files)}
            />
          )}
        />

        <Button variant="primary" type="submit" disabled={!isValid}>
          Register
        </Button>

        {error && (
          <Alert className="mt-3" variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
};
