/* eslint-disable react-hooks/rules-of-hooks */
import { signInUser } from "@/redux/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


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
                
             
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    className="btn bg-orange-600 text-white hover:bg-orange-400"
                  />
                </div>
              </form>
              <p>
                <small className="text-orange-600 ml-6 text-sm">
                  Already have no account? please{" "}
                  <Link href="/register" className="font-bold">
                    Register
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

export default login;