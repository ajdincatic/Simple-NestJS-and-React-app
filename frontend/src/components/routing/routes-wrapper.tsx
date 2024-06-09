import { Navigate, Route, Routes } from 'react-router';
import { routes } from '../../shared/constants';
import { Login } from '../login';
import { Register } from '../register';

export const RoutesWrapper = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <Routes>
    {!isLoggedIn ? (
      <>
        <Route index path={routes.LOGIN} element={<Login />} />
        <Route index path={routes.REGISTER} element={<Register />} />
        <Route path="*" element={<Navigate to={'/login'} />} />
      </>
    ) : (
      <>
        <Route index path={routes.PROFILE} element={<Login />} />
        <Route path="*" element={<Navigate to={'/login'} />} />
      </>
    )}
  </Routes>
);
