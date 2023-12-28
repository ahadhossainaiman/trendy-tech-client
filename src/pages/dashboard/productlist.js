import DashboardLayouts from '@/components/Layouts/DashboardLayouts';
import { useGetLikesQuery, useGetProductQuery, useGetReviewsQuery } from '@/redux/api/baseApi';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = () => {
    const {name,email,photoUrl} = useSelector((state)=>state.userSlice);
    const {data:products} = useGetProductQuery();
    const {data:likes} = useGetLikesQuery();
    const {data:reviews} = useGetReviewsQuery()
    console.log(likes);
    console.log(products);
    // console.log(name);
    const userProducts = products?.filter(product=>product?.owner_email==email);
 

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Product Name</th>
        <th>Like</th>
        <th>Review</th>
        <th>Status</th>
        <th>Update Button</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        userProducts?.map((product,index)=>(
            <>
            <tr>
            <th>{index+1}</th>
            <th><img className='w-10 rounded-lg' src={product.product_img} alt="" /></th>
            <td>{`${product?.product_name.slice(0,30)}...`}</td>
            <td>{likes?.filter(like=>like?.product_id===product?._id)?.length}</td>
            <td>{reviews?.filter(review=>review.product_id==product?._id).length}</td>
            <td><span className='bg-orange-500 rounded-md p-1 text-white'>pending</span></td>
            <td><Link href={`/dashboard/${product._id}`}><span className='bg-orange-500 rounded-md p-1 text-white'>Update</span></Link></td>
            <td><span className='bg-red-500 rounded-md p-1 text-white'>Delete</span></td>
          </tr>
          </>
        ))
      }
    
      {/* row 2 */}
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ProductList;
ProductList.getLayout = function getLayout(page) {
    return <DashboardLayouts>{page}</DashboardLayouts>;
  };