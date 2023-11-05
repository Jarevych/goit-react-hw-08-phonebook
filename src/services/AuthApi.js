import axios from 'axios';

const phonebookInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  phonebookInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const requestReg = async formData => {
  const { data } = await phonebookInstance.post('users/signup', formData);
  setToken(data.token);
  return data;
};
export const requestLogin = async formData => {
  const { data } = await phonebookInstance.post('users/login', formData);
  setToken(data.token);
  return data;
};
export const requestLogout = async () => {
  const { data } = await phonebookInstance.post('users/logout');
  return data;
};
export const refreshUser = async () => {
  const { data } = await phonebookInstance.get('users/current');
  return data;
};
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
