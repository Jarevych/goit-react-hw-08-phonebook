import { useDispatch } from 'react-redux';
import '../styles.css';
// import ContactList from './ContactList';
// import FormInput from './Form';
// import Filter from './Filter';
// import Registration from 'pages/RegistrationPage';
// import { useSelector } from 'react-redux';
// import Login from 'pages/LoginPage';
import Contacts from 'pages/Contacts';
import { useEffect } from 'react';
import { refreshThunk } from 'redux/AuthReducer';
// import { FetchContacts } from 'services/ApiHandler';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk())
  }, [dispatch])

  return (
    <div className="app-container">
      
          <div>
            <Contacts />
          </div>
       
    </div>
  );
}
