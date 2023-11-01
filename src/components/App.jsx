import '../styles.css';
import ContactList from './ContactList';
import FormInput from './Form';
import Filter from './Filter';

export function App() {

  return (
    <div className="app-container">
      <h2 className="app-title">Phonebook</h2>
      <FormInput />
      <h2 className="contacts-title">Contacts</h2>
      <Filter />
      <div>
        <ContactList />
      </div>
    </div>
  );
}
