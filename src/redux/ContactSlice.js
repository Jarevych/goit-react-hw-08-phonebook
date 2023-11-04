import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { createAction } from '@reduxjs/toolkit';
import {
  FetchContacts,
  addContact,
  deleteContact,
} from '../services/ApiHandler';

export const checkContactExistence = createAction('contacts/checkExistence');

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
      .addCase(FetchContacts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(FetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(FetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        if(Array.isArray(state.contacts)) {
          state.contacts.unshift(action.payload);
        }
        else {
          state.contacts = [action.payload]
        }
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  // deleteContact(state, action) {
  //   state.contacts = state.contacts.filter(
  //     contact => contact.id !== action.payload
  //   );
  // },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};
export const persistedReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

// export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
export const { checkExistence } = contactSlice.actions;
