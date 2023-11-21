import {apiSlice} from "../../api/apiSlice.ts";
import {ICategory, IProduct} from "../../../interfaces/icommon.ts";

export const commonApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/products',
            }),
            // transformResponse: (response: { data: IProduct }) => response.data,
        }),
        fetchCategories: builder.query<ICategory[], void>(
            {
                query: () => ({
                    url: '/categories',
                    method: 'GET',
                })
            }
        ),
    })
})

export const {useFetchCategoriesQuery, useFetchProductsQuery} = commonApiSlice