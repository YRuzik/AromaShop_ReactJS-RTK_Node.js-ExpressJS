import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import {IInitCommon} from "../../../interfaces/iredux.ts";

const initialState: IInitCommon = {
    cart: [],
    toasterState: {
        isOpen: false,
        title: "",
        message: ""
    }
}

const commonSlice = createSlice({
    extraReducers: undefined,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setToaster: (state, action) => {
            state.toasterState = action.payload
        }
    },
    name: 'common',
    initialState: initialState
})

export const {setCart, setToaster} = commonSlice.actions

export default commonSlice.reducer

export const selectCurrentCart = (state: RootState) => state.common.cart
export const selectToasterState = (state: RootState) => state.common.toasterState