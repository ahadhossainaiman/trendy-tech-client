/* eslint-disable react-hooks/rules-of-hooks */
import { createUser } from '@/redux/features/user/userSlice';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const registerPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm();

const dispatch = useDispatch();
const {error,isError,isLoading,email,name} = useSelector((state)=>state.userSlice);
console.log(error,isError,isLoading,email,name);

      const onSubmit = ({name,email,password,photoURL}) => {
        dispatch(createUser({
            name,email,password,photoURL
        }))
        reset()
      }
    //   console.log(errors);
    return (
        <div>
        {/* <Toaster position="top-right" /> */}
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              {/* <Lottie animationData={login} loop={true} className="" /> */}
            </div>
            <div className="">
              <form
                className="card-body bg-yellow-100  shadow-2xl p-6 md:mt-16 rounded-2xl border border-black"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h4 className="font-bold mb-2">Please SignUp</h4>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-500">name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
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
                    <p className="text-red-500">password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500">password must be six character</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500">
                      please provide uppercase and special character
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirm", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.confirm && (
                    <span className="text-red-500">
                      Please Re-Write your password
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Photo URL"
                    {...register("photoURL", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.photoURL && (
                    <span className="text-red-500">Photo URL is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="SignUp"
                    className="btn bg-orange-600 text-white hover:bg-orange-400"
                  />
                </div>
              </form>
              <p>
                <small className="text-orange-600 ml-6 text-sm">
                  Already have an account? please{" "}
                  <Link href="/login" className="font-bold">
                    Login
                  </Link>
                </small>
              </p>
              {/* <SocialLogIn></SocialLogIn> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default registerPage;