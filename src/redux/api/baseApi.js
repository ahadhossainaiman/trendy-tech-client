import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000'
    }),
    tagTypes:['post'],
    endpoints:(builder)=>({
        getProduct:builder.query({
            query:()=>({url:`/products`})
        })
        ,

        createUser:builder.mutation({
            query:({name,email,photoURL})=>({
                url:'/users',
                method:'POST',
                body:{ name,email,photoURL}
            })
        })
    })
})

export const {useCreateUserMutation,useGetProductQuery} = baseApi;

export default baseApi;