import {apiSlice} from "../../api/apiSlice.ts";
import {IUser, IUserLogin} from "../../../interfaces/iuser.ts";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<IUser, IUserLogin>({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation<void, IUser>(
            {
                query: credentials => ({
                    url: '/registration',
                    method: 'POST',
                    body: {...credentials}
                })
            }
        )
    })
})

export const {useLoginMutation, useRegisterMutation} = authApiSlice