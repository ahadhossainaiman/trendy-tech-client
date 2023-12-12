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
        }),
        createLikes:builder.mutation({
            query:({product_id,photo_url,email, owner_img, product_name,product_owner})=>({
                url:`/likes`,
                method:'POST',
                body:{product_id,photo_url,email, owner_img, product_name,product_owner}
            })
        }),
        createDisLike:builder.mutation({
            query:({email,product_id})=>({
                url:`/dislikes`,
                method:'DELETE',
                body:{email,product_id}
            })
        })

    })
    
})

export const {useCreateUserMutation,useGetProductQuery,useCreateReviewsMutation,useGetReviewsQuery,useCreateLikesMutation,useCreateDisLikeMutation} = baseApi;

export default baseApi;