import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  allContacts,
  addContact,
  delContact,
  //   setToken,
} from '../services/ContactsApi';

export const fetchContacts = createAsyncThunk(
  'contacts/all',
  async (_, thunkAPI) => {
    try {
      const response = await allContacts();
      console.log(response.data)
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  },{condition: (_, thunkAPI) => {
        const logined = thunkAPI.getState().auth.authentification;
    
        if(!logined) return true;
        return false;
    
    }}
    );
    

export const addNewContact = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const contact = await addContact(newContact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);
export const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkAPI) => {
    try {
      const deletedContact = await delContact(contactId);
      return deletedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);

// export const checkContactExistence = createAction('contacts/checkExistence');

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.contacts)) {
          state.contacts.unshift(action.payload);
        } else {
          state.contacts = [action.payload];
        }
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(fetchContacts.pending, addNewContact.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addNewContact.rejected,
          deleteContacts.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

// const persistConfig = {
//   key: 'contacts',
//   whitelist: ['contacts'],
// };
// export const persistedReducer = persistReducer(
//   persistConfig,
//   contactSlice.reducer
// );
// export const { addNewContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
export const { checkExistence } = contactSlice.actions;
