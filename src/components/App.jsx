import { useDispatch } from 'react-redux';
import '../styles.css';
import { ProgressBar } from 'react-loader-spinner';

// import ContactList from './ContactList';
// import FormInput from './Form';
// import Filter from './Filter';
import { Route, Routes } from 'react-router-dom';

// import Registration from 'pages/RegistrationPage';
// import { useSelector } from 'react-redux';
// import Login from 'pages/LoginPage';
import Contacts from '../pages/Contacts';
import { useEffect, Suspense } from 'react';
import { refreshThunk } from 'redux/AuthReducer';
import Navigation from './Navigation';
import LoginPage from '../pages/LoginPage';
import Registration from '../pages/RegistrationPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// import { FetchContacts } from 'services/ApiHandler';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  const appRoutes = [
    {path: '/login', element: ( <PublicRoute><LoginPage/></PublicRoute> )},
    {path: '/registration', element: ( <PublicRoute><Registration/></PublicRoute> ) },
    {path: '/contacts', element: ( <PrivateRoute><Contacts/></PrivateRoute> ) },

  ]

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
            <Navigation/>
              <Routes>
                {appRoutes.map(({ path, element}) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Routes>
        </Suspense>
      </div>
    </div>
  );
}
