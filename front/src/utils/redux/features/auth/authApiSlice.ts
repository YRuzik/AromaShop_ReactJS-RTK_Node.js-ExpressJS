import {apiSlice} from "../../api/apiSlice.ts";
import {IAuth, IUser, IUserLogin} from "../../../interfaces/iuser.ts";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<IAuth, IUserLogin>({
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
        ),
        refresh: builder.mutation<IAuth, void>(
            {
                query: () => ({
                    url: '/refresh',
                    method: 'GET'
                })
            }
        )
    })
})

export const {useLoginMutation, useRegisterMutation, useRefreshMutation} = authApiSlice