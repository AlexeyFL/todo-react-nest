import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { RoutePaths } from '../routes';
import { registerUser, loginUser } from '../store/user/userSlice';

interface IRegister {
  username?: string;
  email: string;
  password: string;
  isMember?: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const [values, setValues] = useState<IRegister>({
    username: '',
    email: '',
    password: '',
    isMember: true,
  });

  useEffect(() => {
    if (user) {
      navigate(RoutePaths.HOME);
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, isMember } = values;

    if (!email || !password || (!isMember && !username)) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ username, email, password }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form__heading">
          {values.isMember ? 'Login' : 'Register'}
        </h3>
        {!values.isMember && (
          <div className="form__row">
            <input
              onChange={handleChange}
              name="username"
              type="text"
              className="form__control"
              placeholder="username"
            />
          </div>
        )}

        <div className="form__row">
          <input
            onChange={handleChange}
            name="email"
            type="email"
            className="form__control"
            placeholder="email"
          />
        </div>
        <div className="form__row">
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="form__control"
            placeholder="password"
          />
        </div>
        <div className="form__row">
          <button className="form__btn">
            {values.isMember ? 'Login' : 'Register'}
          </button>
        </div>
        <div className="form__row">
          <p>
            {values.isMember ? (
              <span className="form__text">Not a member yet?</span>
            ) : (
              <span className="form__text">Already a member?</span>
            )}
            <button className="form__link" type="button" onClick={toggleMember}>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
          <Link className="back-btn" to={'/'}>
            Back to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
