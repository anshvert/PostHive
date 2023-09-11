import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface LoginState {
    loginStatus: boolean;
}

const initialState: LoginState = {
    loginStatus: false,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginState(state, action): void {
            state.loginStatus = action.payload;
        },
    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload.auth,
    //         };
    //     },
    // },
});

export const { setLoginState } = loginSlice.actions;

export const selectLoginState = (state: AppState) => state.login.loginStatus;

export default loginSlice.reducer;