import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Container } from 'react-bootstrap';
import { CustomInput, InputTypes } from './shared/custom-input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../shared/custom-hooks';
import { userRegister } from '../redux/reducers/register';
import { RegisterPayload } from '../shared/types';
import { endpoints } from '../shared/constants';
import { LoadingSpinner } from './shared/loading-spinner';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './styles/register.module.css';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: FileList | null;
}

export const Register = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      photos: null,
    },
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setValue('photos', files, { shouldValidate: true });

      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(previews);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.photos.length < 4) {
      setError('At least 4 photos should be selected.');

      setTimeout(() => {
        setError('');
      }, 3000);

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Array.from(data.photos).forEach((file) => {
        formData.append('files', file);
      });

      const uploadResponse = await axios.post(
        endpoints.IMAGE_UPLOAD,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const photoUrls = uploadResponse.data.successfull;

      const registerPayload: RegisterPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        photos: photoUrls,
      };

      await dispatch(userRegister(registerPayload)).unwrap();

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err?.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {success ? (
            <Alert className="mt-3" variant="success">
              <h4>User registered successfully. Redirecting to login.</h4>
            </Alert>
          ) : (
            <>
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
                    rules={{
                      validate: (files) =>
                        (files && files.length >= 4) ||
                        'At least 4 photos are required',
                    }}
                    render={({ field }) => (
                      <div>
                        <CustomInput
                          inputType={InputTypes.FILE}
                          name="photos"
                          label="Photos"
                          error={errors.photos?.message}
                          multiple={true}
                          value={
                            field.value
                              ? Array.from(field.value)
                                  .map((file) => file.name)
                                  .join(', ')
                              : ''
                          }
                          onChange={handleImageChange}
                        />
                        <div className={styles.imagePreviews}>
                          {imagePreviews.map((src, index) => (
                            <img
                              key={index}
                              src={src}
                              alt={`preview ${index}`}
                              className="img-thumbnail"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  />

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      className="mr-2"
                      onClick={() => navigate('/login')}
                    >
                      Go back
                    </Button>
                    <Button variant="primary" type="submit" disabled={!isValid}>
                      Register
                    </Button>
                  </div>

                  {error && (
                    <Alert className="mt-3" variant="danger">
                      {error}
                    </Alert>
                  )}
                </Form>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};
