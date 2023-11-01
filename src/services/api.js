import axios from 'axios';

const phonebookInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
    phonebookInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  
