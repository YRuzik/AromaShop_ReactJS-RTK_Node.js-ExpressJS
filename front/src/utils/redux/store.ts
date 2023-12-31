import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./api/apiSlice.ts";
import authReducer from "./features/auth/authSlice.ts"
import commonReducer from "./features/common/commonSlice.ts"
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        common: commonReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>