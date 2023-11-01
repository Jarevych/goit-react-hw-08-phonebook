import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://653e0e33f52310ee6a9a81ce.mockapi.io/contacts/";

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
}
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

