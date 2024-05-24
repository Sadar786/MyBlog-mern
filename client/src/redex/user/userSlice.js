import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart:(state) =>{
            state.loading= true,
            state.error= null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        },
        updateFaluire: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        deleteUserStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure , updateStart, updateSuccess, updateFaluire, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;

export default userSlice.reducer;
