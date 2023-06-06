// Libs
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    removeContact(state, action) {
      return state.contacts.filter(item => item.id !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
