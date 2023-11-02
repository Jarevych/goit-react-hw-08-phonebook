import '../styles.css';
import ContactList from '../components/ContactList';
import FormInput from '../components/Form';
import Filter from '../components/Filter';
import Registration from 'pages/RegistrationPage';
import { useDispatch, useSelector } from 'react-redux';
import Login from 'pages/LoginPage';
import { logoutThunk } from 'redux/AuthReducer';

export default function Contacts() {
    const dispatch = useDispatch();
    const logined = useSelector(state => state.auth.authentification);
    const logOut = () => {
        dispatch(logoutThunk())
    }
  return (
    <div className="app-container">
      {!logined && (
        <div>
          <Registration />
          <Login />
        </div>
      )}

      {logined ? (
        <div>
            <button type='button' onClick={logOut}>Logout</button>
          <h2 className="app-title">Phonebook</h2>
          <FormInput />
          <h2 className="contacts-title">Contacts</h2>
          <Filter />
          <div>
            <ContactList />
          </div>
        </div>

      ) : (
        <p>Please login or register</p>
      )}
    </div>
  );
}
