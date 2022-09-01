import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RoutePaths } from '../routes';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import ErrorPage from '../pages/ErrorPage';

import Home from '../pages/Home';
import TodoPage from '../pages/TodoPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.HOME} element={<Home />} />

      <Route path={RoutePaths.TODOS} element={<PrivateRoute />}>
        <Route path={RoutePaths.TODOS} element={<TodoPage />} />
      </Route>

      <Route path={RoutePaths.REGISTER} element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
