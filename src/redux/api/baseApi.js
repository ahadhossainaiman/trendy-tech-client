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
        getReviews:builder.query({
            query:()=>({url:`/reviews`})
        }),
        createUser:builder.mutation({
            query:({name,email,photoURL})=>({
                url:'/users',
                method:'POST',
                body:{ name,email,photoURL}
            })
        }),
        createReviews:builder.mutation({
            query:({email,name,photo_url,product_id,review})=>({
                url:`/reviews`,
                method:'POST',
                body:{email,name,photo_url,product_id,review}
            })
        })
    })
    
})

export const {useCreateUserMutation,useGetProductQuery,useCreateReviewsMutation,useGetReviewsQuery} = baseApi;

export default baseApi;