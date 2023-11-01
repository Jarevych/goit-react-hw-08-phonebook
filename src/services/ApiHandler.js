import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useSelector } from 'react-redux';

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

export const FetchContacts = createAsyncThunk('contacts/all',
async(_, thunkAPI) => {
    try{
        const response = await axios.get('/contacts')
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.massage)
    }
}, {condition: (_, thunkAPI) => {
    const logined = thunkAPI.getState().auth.authentification;

    if(!logined) return true;
    return false;

}}
);

export const addContact = createAsyncThunk('contacts/newContact',
async(newContact, thunkAPI) => {
    try{
        const response = await axios.post('/contacts', newContact)
        console.log(response)
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.massage)
    }
}
);

export const deleteContact = createAsyncThunk('contacts/deleteContact',
async(contactId, thunkAPI) => {
    try{
        const response = await axios.delete(`/contacts/${contactId}`)
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.massage)
    }
}
);

