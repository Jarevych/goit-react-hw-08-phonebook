const { createSlice } = require('@reduxjs/toolkit');
const filterInit = {
    filter: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInit,

    reducers: {
        filterContact: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { filterContact, findContact } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;