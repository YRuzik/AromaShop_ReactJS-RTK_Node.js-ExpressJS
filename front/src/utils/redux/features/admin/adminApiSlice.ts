import {apiSlice} from "../../api/apiSlice.ts";
import {IAdminOrder} from "../../../interfaces/iuser.ts";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchAllOrders: builder.query<IAdminOrder[], void>({
            query: () => ({
                url: '/admin/orders',
            }),
        }),
    })
})

export const {useFetchAllOrdersQuery} = adminApiSlice