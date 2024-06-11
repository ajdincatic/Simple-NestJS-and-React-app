import { useEffect, useState } from 'react';
import { Container, Image, Carousel } from 'react-bootstrap';
import { userMe } from '../redux/reducers/me';
import { UserProfile } from '../shared/types';
import { useAppDispatch, useAppSelector } from '../shared/custom-hooks';
import { LoadingSpinner } from './shared/loading-spinner';

import styles from './styles/profile.module.css';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.me);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    dispatch(userMe())
      .unwrap()
      .then((userData) => {
        setProfile(userData);
      });
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <Image
                src={profile?.user.avatarUrl}
                roundedCircle
                className={styles.avatar}
              />
              <h1>{profile?.user.fullName}</h1>
            </div>
            <Carousel className={styles.carousel}>
              {profile?.photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <Image src={photo.url} className={styles.carouselImage} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </>
      )}
    </>
  );
};
