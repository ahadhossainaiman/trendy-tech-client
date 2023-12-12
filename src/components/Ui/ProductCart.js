import Link from "next/link";
import { FaRegComment } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useCreateReviewsMutation, useGetProductQuery, useGetReviewsQuery } from "@/redux/api/baseApi";
import { toast } from "react-toastify";
import { useState } from "react";

const ProductCart = ({ product }) => {
    
  const { register, handleSubmit,reset } = useForm();
  const {
    _id,
    creationDate,
    creationTime,
    external_link,
    owner_email,
    owner_img,
    product_description,
    product_img,
    product_name,
    product_owner,
    tags,
  } = product;
  const [updateId,setUpdateId] = useState();
  const router = useRouter();
  const [createReviews,{data:res,errorMsg}] = useCreateReviewsMutation();
  const {data:reviews,isLoading,error} = useGetReviewsQuery();

  // console.log(reviews);
 
  const {name,email,photo_url} = useSelector((state)=>state.userSlice);
  
  const onSubmit = (data)=>{
  
    const review = {...data,email,name,photo_url,product_id:updateId};
    createReviews(review);
    // console.log(res);
    if(res){
      toast.success(`Thankyou ${name} For You Valuable Review !`, {
        position: toast.POSITION.TOP_CENTER
      })
      reset()
    }else{
      toast.error({errorMsg}, {
        position: toast.POSITION.TOP_CENTER
      })
    }
    
  }

  const handleModalOpen = (id)=>{
    setUpdateId(id)
    console.log(id);
    if(name){
      document.getElementById("my_modal_3").showModal()
    }else{
      console.log('aiman');
      router.push('/login')
    }
  }

  const filterReview = reviews?.filter((review)=>{
    return review.product_id == updateId;
  })
  // console.log(filterReview);
  return (
    <div className="mx-10 my-10 ">
      <div className="bg-slate-100 p-5 rounded-lg">
        <div className="flex gap-2 items-center ">
          <img
            className="w-16 h-16 rounded-full border-blue-600 border-2 "
            src={owner_img}
            alt=""
          />
          <div className="leading-5">
            <h1 className="text-[20px] text-blue-600 font-bold ">
              {product_owner}
            </h1>
            <small className="text-[12px]">{`${creationTime} & ${creationDate}`}</small>
          </div>
        </div>
        <div className="">
          <h1 className="text-[20px] font-bold text-purple-600">
            {product_name}
          </h1>
          <img
            className="w-[100%] h-96 rounded-lg my-5"
            src={owner_img}
            alt=""
          />
          <Link href="/" className="font-bold">
            {product_description.slice(0, 100)}...
          </Link>
          <br />
          <p>Owner Business </p>
          {tags.map((tag) => (
            <spam className="text-blue-600 font-bold">{`#${tag.text}`} </spam>
          ))}
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center">
            <AiFillLike /> <span> 10</span>
          </div>
          <div>
            <p>10 review</p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-y-2 p-2 items-center">
          <div className="flex justify-center items-center gap-2">
            <AiFillLike />
            <p>Link</p>
          </div>
          
          <div  onClick={()=>handleModalOpen(_id)} className="flex cursor-pointer justify-center items-center gap-2">
            <FaRegComment /> <p>Review</p>
          </div>
          <div className="flex  justify-center items-center gap-2">
            <MdOutlineReportProblem />
            <p>Report</p>
          </div>
        </div>
        {
         filterReview?.map((review)=><div key={review._id} className="">
          <div className="">
            <div className="flex gap-1 items-center">
            <img className="w-8 h-8 rounded-full border-2 border-blue-500" src={review.photo_url} alt="" />
            <p className="text-[15px] text-blue-500 font-bold">{review.name}</p>
            </div>
            <div className="ml-8 mt-3">
              <span className="bg-white py-2 px-3 rounded-xl">{review.review}</span>
            </div>
          </div>

        </div>
            
          )
        }
       


        <Modal id='my_modal_3'>
          <div className="flex gap-3 items-center">
          <img className="w-10 h-10 rounded-full border-2 border-green-400" src={photo_url} alt="" />
            <h3 className="font-bold text-lg">Please Provide Your Valuable Review!</h3>
          </div>
            
            <form  onSubmit={handleSubmit(onSubmit)}>
                <textarea rows='2' className="border-2 border-gray-200 w-full h-10 mt-3 p-2 text-[15px]" placeholder="Review..." type="text"  {...register("review", { required: true })} />
                <input className="bg-green-400 border-2 w-full border-red-400 cursor-pointer hover:border-black py-2 px-14 my-5 rounded-lg text-white font-bold" type="submit" value='Submit' />
            </form>
        </Modal>
        
      </div>
    </div>
  );
};

export default ProductCart;
