import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

export const filterContactsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { filterContacts } = filterContactsSlice.actions;

export default filterContactsSlice.reducer;
