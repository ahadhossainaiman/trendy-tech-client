import Link from "next/link";
import { FaRegComment } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

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
  console.log(_id);
  const {name,email,photo_url} = useSelector((state)=>state.userSlice);
  const onSubmit = (data)=>{
    console.log({...data,email,name,photo_url,product_id:_id});
    reset()
  }
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
          <div   onClick={() => document.getElementById("my_modal_3").showModal()} className="flex cursor-pointer justify-center items-center gap-2">
            <FaRegComment /> <p>review</p>
          </div>
          <div className="flex  justify-center items-center gap-2">
            <MdOutlineReportProblem />
            <p>report</p>
          </div>
        </div>
       
        <Modal id='my_modal_3'>
        
            <h3 className="font-bold text-lg">Please Provide Your Valuable Review!</h3>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <textarea rows='2' className="border-2 border-gray-200 w-full h-10 mt-3 p-2 text-[20px]" placeholder="review..." type="text"  {...register("review", { required: true })} />
                <input className="bg-green-500 py-2 px-14 my-5 rounded-lg text-white font-bold" type="submit" value='submit' />
            </form>
        </Modal>
        
      </div>
    </div>
  );
};

export default ProductCart;
