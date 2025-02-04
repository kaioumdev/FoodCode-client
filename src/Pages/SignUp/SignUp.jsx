import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Img from "../../assets/others/authentication2.png";

// const SignUp = () => {
//   const { createUser, updateUserProfile } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const onSubmit = (data) => {
//     createUser(data.email, data.password).then((result) => {
//       const logedInuser = result.user;
//       updateUserProfile(data.name, data.photoURL).then(() => {
//         const userInfo = {
//           name: data.name,
//           email: data.email,
//           photoURL: data.photoURL,
//         };
//         axiosPublic.post("/users", userInfo).then((res) => {
//           if (res.data.insertedId) {
//             reset();
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: "User created successfully",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             navigate("/");
//           }
//         });
//       });
//     });
//   };
//   return (
//     <>
//       <Helmet>
//         <title>FoodCode | Sign Up</title>
//       </Helmet>
//       <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold">SignUp now!</h1>
//             <p className="py-6">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//               excepturi exercitationem quasi. In deleniti eaque aut repudiandae
//               et a id nisi.
//             </p>
//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   {...register("name", { required: true, maxLength: 80 })}
//                   placeholder="name"
//                   className="input input-bordered"
//                   required
//                 />
//                 {errors.name && (
//                   <span className="text-red-600">Name is required</span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Photo URL</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="photoURL"
//                   {...register("photoURL", { required: true })}
//                   placeholder="name"
//                   className="input input-bordered"
//                   required
//                 />
//                 {errors.photoURL && (
//                   <span className="text-red-600">Photo URL is required</span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   {...register("email", { required: true, maxLength: 80 })}
//                   placeholder="email"
//                   className="input input-bordered"
//                   required
//                 />
//                 {errors.email && (
//                   <span className="text-red-600">Email is required</span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   {...register("password", {
//                     required: true,
//                     minLength: 6,
//                     maxLength: 20,
//                     pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/,
//                   })}
//                   placeholder="password"
//                   className="input input-bordered"
//                   required
//                 />
//                 {errors.password?.type === "required" && (
//                   <p className="text-red-600">Password is required</p>
//                 )}
//                 {errors.password?.type === "minLength" && (
//                   <p className="text-red-600">Password must be 6 characters</p>
//                 )}
//                 {errors.password?.type === "maxLength" && (
//                   <p className="text-red-600">
//                     A maximum length of 20; characters.
//                   </p>
//                 )}
//                 {errors.password?.type === "pattern" && (
//                   <p className="text-red-600">
//                     Password must have one uppercase one lowercase, one number and one special character
//                   </p>
//                 )}
//                 <label className="label">
//                   <a href="#" className="label-text-alt link link-hover">
//                     Forgot password?
//                   </a>
//                 </label>
//               </div>
//               <div className="form-control mt-6">
//                 <input
//                   type="submit"
//                   value="Sign Up"
//                   className="btn btn-primary"
//                 ></input>
//               </div>
//             </form>
//             <div>
//               <p className="text-center">
//                 Already have an account?{" "}
//                 <Link to="/login" className="link link-hover">
//                   LogIn
//                 </Link>
//               </p>
//             </div>
//             <div className="divider"></div>
//             <SocialLogin></SocialLogin>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

const Signup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const logedInuser = result.user;
      updateUserProfile(data.name, data.photoURL).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      });
    });
  };
  return (
    <>
      <Helmet>
        <title>FoodCode | Sign Up</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row-reverse">

          {/* Right Side - Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-gray-50 justify-center items-center p-6">
            <img
              src={Img} // Replace with your actual image
              alt="Illustration"
              className="w-full max-w-xs"
            />
          </div>

          {/* Left Side - Signup Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

            <form>
              {/* Name Input */}
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Email Input */}
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Type here"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Password Input */}
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Sign Up Button */}
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-md shadow-md hover:opacity-90">
                Sign Up
              </button>

              {/* Already have an account? */}
              <p className="text-center mt-4 text-sm">
                Already have an account? <a href="#" className="text-orange-500 font-semibold">Login here</a>
              </p>

              {/* Social Signup */}
              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">Or sign up with</p>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="#" className="text-gray-500 hover:text-black text-2xl">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <button className="text-gray-500 hover:text-black text-2xl">
                    {/* <i className="fab fa-google"></i> */}
                    <SocialLogin></SocialLogin>
                  </button>
                  <a href="#" className="text-gray-500 hover:text-black text-2xl">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
