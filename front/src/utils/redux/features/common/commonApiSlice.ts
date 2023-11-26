import {apiSlice} from "../../api/apiSlice.ts";
import {ICategory, IProduct} from "../../../interfaces/icommon.ts";

export const commonApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/products',
            }),
            keepUnusedDataFor: 0
        }),
        fetchCategories: builder.query<ICategory[], void>(
            {
                query: () => ({
                    url: '/categories',
                    method: 'GET',
                })
            }
        ),
        fetchSingleProduct: builder.query<IProduct, string>({
            query: (id) => ({
                url: `/products/${id}`
            }),
            keepUnusedDataFor: 0
        }),
    })
})

export const {useFetchCategoriesQuery, useFetchProductsQuery, useFetchSingleProductQuery} = commonApiSlice