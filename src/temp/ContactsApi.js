import axios from 'axios';

const phonebookInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  phonebookInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const allContacts = async () => {
  const { data } = await phonebookInstance.get('/contacts');
  setToken(data.token);
  return data;
};
export const addContact = async newContact => {
  const { data } = await phonebookInstance.post('/contacts', newContact);
  setToken(data.token);
  return data;
};
export const delContact = async contactId => {
  const { data } = await phonebookInstance.delete(`/contacts/${contactId}`);
  return data;
};
