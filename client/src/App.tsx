import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './components/AppRouter';

const App = () => {
  return (
    <div className="app">
      <AppRouter />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
