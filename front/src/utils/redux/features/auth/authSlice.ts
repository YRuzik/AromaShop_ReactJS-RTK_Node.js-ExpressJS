import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {IInitState} from "../../../interfaces/iredux.ts";

const initialState: IInitState = {
    user: null, token: null
}

const authSlice = createSlice({
    extraReducers: undefined,
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem("aroma-token")
        }
    },
    name: 'auth',
    initialState: initialState
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token