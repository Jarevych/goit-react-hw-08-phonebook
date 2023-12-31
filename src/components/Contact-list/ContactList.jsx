import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/ContactsReducer';
import { ProgressBar } from 'react-loader-spinner';

const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId)).then(() => {
      dispatch(fetchContacts());
    });
  };
  const contactsArr = Array.isArray(contacts) ? contacts : [];
  const filteredContacts = filter
    ? contactsArr.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contactsArr;
  return (
    <div>
           {isLoading && (
  <ProgressBar
    height="80"
    width="80"
    ariaLabel="progress-bar-loading"
    wrapperStyle={{}}
    wrapperClass="progress-bar-wrapper"
    borderColor="#F4442E"
    barColor="#51E5FF"
  />
)}
      <ul className="contact-list">
        {filteredContacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <p className="contact-name">Name: {contact.name}</p>
            <p className="contact-number">Number: {contact.number}</p>
            <button
              type="button"
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
     
    </div>
  );
};
export default ContactList;
