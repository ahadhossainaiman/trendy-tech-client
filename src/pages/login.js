/* eslint-disable react-hooks/rules-of-hooks */
import { signInUser } from "@/redux/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import React from "react";


const login = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm();

const dispatch = useDispatch();
const router = useRouter()
const {error,isError,isLoading,email,name} = useSelector((state)=>state.userSlice);
// console.log(error,isError,isLoading,email,name);

      const onSubmit = ({email,password}) => {
        dispatch(signInUser({
            email,password
        }))
        router.push('/', { scroll: false })
        reset()
    }
    return (
        <div data-theme="light">
        {/* <Toaster position="top-right" /> */}
        <div className="hero min-h-screen bg-base-200 bg-[url('https://i.ibb.co/XjjpbpT/nasa-Q1p7bh3-SHj8-unsplash.jpg')]">



            <div className="min-w-[30%]">
              <form
                  style={{ backdropFilter:'saturate(180%) blur(5px)'}}
                  className="card-body shadow-2xl p-6 md:mt-16 rounded-2xl border border-black min-w-[30%]"
                onSubmit={handleSubmit(onSubmit)}
              >
                  <h1 className=" text-3xl flex justify-center my-3 text-white">Login Your Account</h1>
                
                <div className="form-control">
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-white">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    //   pattern: /(?=.*[!@#$%^&*])(?=.*[A-Z])/,
                    })}
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-white">password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-white">password must be six character</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-white">
                      please provide uppercase and special character
                    </p>
                  )}
                </div>
                
             
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    className="btn bg-orange-600 text-white hover:bg-orange-400"
                  />
                </div>
                  <p>
                      <small className="text-white ml-6 text-sm">
                          Already have no account? please{" "}
                          <Link href="/register" className="font-bold">
                              Register
                          </Link>
                      </small>
                  </p>
              </form>

              {/* <SocialLogIn></SocialLogIn> */}
            </div>

        </div>
      </div>
    );
};

export default login;