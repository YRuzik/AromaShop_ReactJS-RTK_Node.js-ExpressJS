import {apiSlice} from "../../api/apiSlice.ts";
import {IAdminOrder} from "../../../interfaces/iuser.ts";
import {IAdditionalInfo, ICategory, IProduct} from "../../../interfaces/icommon.ts";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchAllOrders: builder.query<IAdminOrder[], void>({
            query: () => ({
                url: '/admin/orders',
            }),
            keepUnusedDataFor: 5
        }),
        fetchSingleOrder: builder.query<IAdminOrder, string>({
            query: orderId => ({
                url: `/admin/orders/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),
        fetchAdditionalInfo: builder.query<IAdditionalInfo, void>({
            query: () => ({
                url: `/admin/additional-info`,
            }),
            keepUnusedDataFor: 0
        }),
        changeOrder: builder.mutation<IAdminOrder[], IAdminOrder>({
            query: newOrder => ({
                url: '/admin/change-order',
                method: 'POST',
                body: {...newOrder}
            }),
        }),
        changeProduct: builder.mutation<void, IProduct>({
            query: newProduct => ({
                url: '/admin/change-product',
                method: 'POST',
                body: {...newProduct}
            }),
        }),
        changeCategory: builder.mutation<void, ICategory>({
            query: nCategory => ({
                url: '/admin/change-category',
                method: 'POST',
                body: {...nCategory}
            }),
        }),
    })
})

export const {
    useFetchAllOrdersQuery,
    useChangeOrderMutation,
    useFetchSingleOrderQuery,
    useChangeProductMutation,
    useFetchAdditionalInfoQuery,
    useChangeCategoryMutation
} = adminApiSlice