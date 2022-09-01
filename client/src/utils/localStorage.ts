import { IUser } from '../types/user';

const addToStorage = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeFromStorage = () => {
  localStorage.removeItem('user');
};

const getFromStorage = () => {
  const result = localStorage.getItem('user');

  const user = result ? JSON.parse(result) : null;

  return user;
};

const storageService = {
  addToStorage,
  removeFromStorage,
  getFromStorage,
};
export default storageService;