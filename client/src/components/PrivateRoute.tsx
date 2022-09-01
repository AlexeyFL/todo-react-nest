import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { RoutePaths } from '../routes';

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.user);

  return user ? <Outlet /> : <Navigate to={RoutePaths.REGISTER} />;
};

export default PrivateRoute;
