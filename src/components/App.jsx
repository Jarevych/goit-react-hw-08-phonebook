import { useDispatch } from 'react-redux';
import '../styles.css';
import { ProgressBar } from 'react-loader-spinner';
import { Route, Routes } from 'react-router-dom';
import Contacts from '../pages/Contacts';
import { useEffect, Suspense } from 'react';
import { refreshThunk } from 'redux/AuthReducer';
import Navigation from './Navigation';
import LoginPage from '../pages/LoginPage';
import Registration from '../pages/RegistrationPage';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  const appRoutes = [
    {
      path: '/login',
      element: (
        <RestrictedRoute>
          <LoginPage />
        </RestrictedRoute>
      ),
    },
    {
      path: '/registration',
      element: (
        <RestrictedRoute>
          <Registration />
        </RestrictedRoute>
      ),
    },
    {
      path: '/contacts',
      element: (
        <PrivateRoute>
          <Contacts />
        </PrivateRoute>
      ),
    },
  ];

  return (
    <div className="app-container">
      <div>
        <Suspense
          fallback={
            <div className="centered">
              <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="#F4442E"
                barColor="#51E5FF"
              />
            </div>
          }
        >
          <Navigation />
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
