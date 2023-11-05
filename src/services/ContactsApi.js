
import { phonebookInstance } from './AuthApi';

export const allContacts = async () => {
  const { data } = await phonebookInstance.get('/contacts');
  return data;
};
export const addContact = async newContact => {
  const { data } = await phonebookInstance.post('/contacts', newContact);
  return data;
};
export const delContact = async contactId => {
  const { data } = await phonebookInstance.delete(`/contacts/${contactId}`);
  return data;
};
