import { createSlice } from "@reduxjs/toolkit";


const loadToken = localStorage.getItem("token");
const loadUser = localStorage.getItem("user");

const initialState = {
    token:loadToken ? loadToken : null,
    user:  (loadUser ? JSON.parse(loadUser) : null),
    isAuthenticated: loadToken ? true : false,

}

const authSlice = createSlice({
    name: "auth",
    initialState,   
    reducers: {
        login: (state, action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;