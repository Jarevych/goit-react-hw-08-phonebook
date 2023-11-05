import '../styles.css';
import ContactList from '../components/ContactList';
import FormInput from '../components/Form';
import Filter from '../components/Filter';
import { useDispatch } from 'react-redux';
import { logoutThunk } from 'redux/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/ContactsReducer';

export default function Contacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const logOut = () => {
    dispatch(logoutThunk());
    navigate('/login');
  };
  return (
    <div className="app-container">
      <div>
        <button type="button" onClick={logOut}>
          Logout
        </button>
        <h2 className="app-title">Phonebook</h2>
        <FormInput />
        <h2 className="contacts-title">Contacts</h2>
        <Filter />
        <div>
          <ContactList />
        </div>
      </div>
    </div>
  );
}
