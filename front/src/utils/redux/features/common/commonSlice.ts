import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {IInitCommon} from "../../../interfaces/iredux.ts";

const initialState: IInitCommon = {
    cart: []
}

const commonSlice = createSlice({
    extraReducers: undefined,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
    },
    name: 'common',
    initialState: initialState
})

export const {setCart} = commonSlice.actions

export default commonSlice.reducer

export const selectCurrentCart = (state: RootState) => state.common.cart