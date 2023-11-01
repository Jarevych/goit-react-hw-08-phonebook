import '../styles.css';
import ContactList from './ContactList';
import FormInput from './Form';
import Filter from './Filter';
import Registration from 'pages/RegistrationPage';
import { useSelector } from 'react-redux';
import Login from 'pages/LoginPage';

export function App() {
  const logined = useSelector(state => state.auth.authentification);

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
