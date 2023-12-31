import {apiSlice} from "../../api/apiSlice.ts";
import {IOrder, IOrderCreation, IUserValidation} from "../../../interfaces/iuser.ts";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        validatePassword: builder.mutation<void, IUserValidation>({
            query: data => ({
                url: '/verification-password',
                method: "POST",
                body: {...data}
            }),
        }),
        createOrder: builder.mutation<void, IOrderCreation>({
            query: data => ({
                url: '/create-order',
                method: "POST",
                body: {...data}
            }),
        }),
        declineOrder: builder.mutation<void, string>({
            query: orderId => ({
                url: '/decline-order',
                method: "POST",
                body: {order_id: orderId}
            }),
        }),
        fetchOrders: builder.query<IOrder[], string>({
            query: id => ({
                url: `/orders/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {
    useValidatePasswordMutation,
    useCreateOrderMutation,
    useDeclineOrderMutation,
    useFetchOrdersQuery
} = usersApiSlice