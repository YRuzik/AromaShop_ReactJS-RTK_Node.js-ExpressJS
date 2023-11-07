import {BaseQueryApi, FetchArgs, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logOut, setCredentials} from "../features/auth/authSlice.ts";
import {RootState} from "../store.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user
            // store new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // retry the original query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    //@ts-ignore
    endpoints: builder => ({})
})