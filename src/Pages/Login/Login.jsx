import React, { useContext, useEffect, useState } from "react";
import Img from "../../assets/others/authentication2.png";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

// const Login = () => {

//   return (
//     <>
//       <Helmet>
//         <title>FoodCode | Login</title>
//       </Helmet>
//       <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row justify-between">
//           {/* <div className="text-center lg:text-left"> */}
//           {/* <h1 className="text-5xl font-bold">Login now!</h1>
//             <p className="py-6">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//               excepturi exercitationem quasi. In deleniti eaque aut repudiandae
//               et a id nisi.
//             </p> */}
//           <img src={Img} alt="" />
//           {/* </div> */}
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <form onSubmit={handleSubmit} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="email"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="password"
//                   className="input input-bordered"
//                   required
//                 />
//                 <label className="label">
//                   <a href="#" className="label-text-alt link link-hover">
//                     Forgot password?
//                   </a>
//                 </label>
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <LoadCanvasTemplate />
//                 </label>
//                 <input
//                   type="text"
//                   onBlur={handleValidateCaptcha}
//                   // ref={captchaRef}
//                   placeholder="Type the captcha above"
//                   className="input input-bordered"
//                 // required
//                 />
//                 {/* <button
//                   className="btn btn-outline btn-xm mt-2"
//                 >
//                   Validate
//                 </button> */}
//               </div>
//               <div className="form-control mt-6">
//                 {/* apply disabled for re captcha*/}
//                 <input
//                   // disabled={disabled}
//                   disabled={false}
//                   type="submit"
//                   value="login"
//                   className="btn btn-primary"
//                 ></input>
//               </div>
//             </form>
//             <p className="text-center">
//               New Here?{" "}
//               <small>
//                 <Link className="font-bold" to="/signup">
//                   Create New Account
//                 </Link>
//               </small>
//             </p>
//             <div className="divider"></div>
//             <SocialLogin></SocialLogin>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();
  let navigate = useNavigate();

  let from = location?.state?.from?.pathname || "/";

  // const captchaRef = useRef(null);
  const { signIn } = useContext(AuthContext);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password).then((result) => {
      const user = result.user;
      Swal.fire({
        title: "User login successful",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>FoodCode | Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

          {/* Left Side - Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-gray-50 justify-center items-center p-6">
            <img
              src={Img} // Replace with your actual image
              alt="Illustration"
              className="w-full max-w-xs"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                // className="input input-bordered"
                required
                placeholder="Type here Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Password Input */}
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                // className="input input-bordered"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Captcha */}
              <div className="mb-4">
                {/* <p className="font-mono text-lg tracking-wide">UAgIuo</p>
                <a href="#" className="text-blue-500 text-sm">Reload Captcha</a> */}
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  onBlur={handleValidateCaptcha}
                  // ref={captchaRef}
                  placeholder="Type the captcha above"
                  // className="input input-bordered"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2"
                />
              </div>

              {/* Sign In Button */}
              <button disabled={false}
                type="submit"
                // className="btn btn-primary" 
                value="login"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-md shadow-md hover:opacity-90">
                Sign In
              </button>

              {/* Create Account */}
              <p className="text-center mt-4 text-sm">
                New here? <Link to="/signup" className="text-orange-500 font-semibold">Create a New Account</Link>
              </p>

              {/* Social Login */}
              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">Or sign in with</p>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="#" className="text-gray-500 hover:text-black text-2xl">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-black text-2xl">
                    <i className="fab fa-google">
                      <SocialLogin></SocialLogin>
                    </i>
                  </a>
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

export default Login;
