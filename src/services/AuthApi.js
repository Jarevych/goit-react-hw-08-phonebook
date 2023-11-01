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
export const requestLogout = async formData => {
  const { data } = await phonebookInstance.post('users/signout', formData);
  return data;
};