import DashboardLayouts from "@/components/Layouts/DashboardLayouts";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
// import './style.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

const updateProduct = () => {
    // const {updateProductId} = useParams();
    // console.log(updateProductId);
    const { register, handleSubmit,reset } = useForm();
    const [tags, setTags] = useState([]);
    const {name,email,photo_url} = useSelector((state)=>state.userSlice);
  
   

    const handleDelete = (i) => {
      setTags(tags.filter((tag, index) => index !== i));
    };
  
    const handleAddition = (tag) => {
      setTags([...tags, tag]);
    };
  
    const handleTagClick = (index) => {
      console.log("The tag at index " + index + " was clicked");
    };
  
    console.log(tags);
  
    const onSubmit = (data) => {
      
      const result =  { ...data, tags }
      fetch('http://localhost:5000/products',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(result)
      }).then(res=>res.json()).then((data)=>{
  
        if(data){
          console.log(data);
          console.log('aiman');
          toast.success("Product Added Successfully !", {
            position: toast.POSITION.TOP_CENTER
          })
          reset();
      }
    })
    
      console.log({ ...data, tags });
    };
    return (
        <>
        <h1 className="text-3xl flex justify-center my-10">Product Add</h1>
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:grid sm:flex sm:flex-col grid-cols-2  gap-5 mx-5">
          <label htmlFor="" className="flex flex-col">
            Product Name:
            <input
              className="border-gray-500 border-2 h-10 p-1"
              placeholder="Enter Your Product Name"
              {...register("product_name", { required: true })}
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            Product Image Url:
            <input
              className="border-gray-500 border-2 h-10 p-1"
              placeholder="Enter Image Url"
              {...register("product_img", { required: true })}
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            Product Owner:
            <input
              className="border-gray-500 border-2 h-10 p-1"
              placeholder="Enter Owner Name" defaultValue={name} readOnly
              {...register("product_owner", { required: true })}
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            Owner Email:
            <input
              className="border-gray-500 border-2 h-10 p-1"
              placeholder="Enter Owner Email"
              defaultValue={email} readOnly
              {...register("owner_email", { required: true })}
            />
          </label>
          <label htmlFor="" className="flex flex-col col-span-2">
            Owner Image Url:
            <input
              className="border-gray-500 border-2 h-10 p-1"
              placeholder="Enter Owner Email"
              defaultValue={photo_url} readOnly
              {...register("owner_img", { required: true })}
            />
          </label>
          <label htmlFor="" className="flex flex-col col-span-2">
            Product Description:
            <textarea
              rows="5"
              className="border-gray-500 border-2"
              placeholder="Enter Owner Email" 
              {...register("product_description", { required: true })}
            />
          </label>
          <label htmlFor="" className="flex flex-col col-span-2">
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              inputFieldPosition="bottom"
              autocomplete
              editable
            />
          </label>
          <label htmlFor="" className="flex flex-col col-span-2">
            External Link:
            <input
              className="border-gray-500 border-2 h-10 p-1"
              placeholder="Enter Owner Email"
              {...register("external_link", { required: true })}
            />
          </label>

          <input
            className="border-gray-500 border-2 hover:bg-red-600  col-span-2 w-1/3 h-10 mx-auto"
            type="submit"
          />
        </div>
      </form>
      </>
    );
};

export default updateProduct;
updateProduct.getLayout = function getLayout(page) {
    return <DashboardLayouts>{page}</DashboardLayouts>;
  };