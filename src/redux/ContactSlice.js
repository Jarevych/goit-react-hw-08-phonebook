import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { createAction } from '@reduxjs/toolkit';
import { FetchContacts, addContact, deleteContact } from './ApiHandler';

export const checkContactExistence = createAction('contacts/checkExistence');

// const contactData = [
//   // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
const INITIAL_STATE = {
  users: [],
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
  builder.addCase(FetchContacts.pending, (state, action) => {
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

  builder.addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
    state.contacts = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    builder
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
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
