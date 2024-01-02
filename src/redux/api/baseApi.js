import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000'
    }),
    tagTypes:['post','likes'],
    endpoints:(builder)=>({
        getProduct:builder.query({
            query:()=>({url:`/products`}),
            providesTags:['post']
        }),
        addProduct:builder.mutation({
            query:(result)=>({
                url:'/products',
              method:'POST',
              body:result
            })
        }),
        getSingleProduct:builder.query({
            query:(id)=>({
                url:`/dashboard/${id}`
            })
        }),
        getReviews:builder.query({
            query:()=>({url:`/reviews`}),
            providesTags:['post']
        }),
        getLikes:builder.query({
            query:()=>({url:`/likes`}),
            providesTags:['likes']

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
            }),
            invalidatesTags:['post']
        }),
        createLikes:builder.mutation({
         query:({product_id,photo_url,email, owner_img, product_name,product_owner,isLike})=>({
                url:`/likes`,
                method:'POST',
                body:{product_id,photo_url,email, owner_img, product_name,product_owner,isLike}
            }),
            invalidatesTags:['likes']
            
        }),
        createStatus:builder.mutation({
            query:({product_id,email})=>({
                url:`/likestatus`,
                method:'POST',
                body:{product_id,email,status:true}
            })
        }),
        createDisLike:builder.mutation({
            query:({email,product_id})=>({
                url:`/dislikes`,
                method:'DELETE',
                body:{email,product_id}
            }),
            invalidatesTags:['likes']

        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/deleteProduct`,
                method:'DELETE',
                body:{id}
            }),
            invalidatesTags:['post']   
        })
    })
    
})

export const {useCreateUserMutation,
    useGetProductQuery,
    useCreateReviewsMutation,
    useGetReviewsQuery,
    useCreateLikesMutation,
    useCreateDisLikeMutation,
    useCreateStatusMutation,
    useGetLikesQuery,
    useDeleteProductMutation,
    useAddProductMutation,
    useGetSingleProductQuery

            } = baseApi;

export default baseApi;