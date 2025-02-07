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
import useAuth from "../../hooks/useAuth";
import useSocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const { handleSocialLogin } = useSocialLogin()
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
                required
                placeholder="Type here Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Password Input */}
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
              />

              {/* Captcha */}
              <div className="mb-4">
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
                className="cursor-pointer w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-md shadow-md hover:opacity-90">
                Sign In
              </button>

              {/* Create Account */}
              <p className="text-center mt-4 text-sm">
                New here? <Link to="/signup" className="text-orange-500 font-semibold">Create a New Account</Link>
              </p>
            </form>
            {/* Social Login */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">Or sign in with</p>
              <div className="flex justify-center gap-4 mt-2">
                {/* Google Login Button */}
                <button
                  onClick={() => handleSocialLogin(signInWithGoogle)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90"
                >
                  <FaGoogle /> Google
                </button>

                {/* GitHub Login Button */}
                <button
                  onClick={() => handleSocialLogin(signInWithGithub)}
                  className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90"
                >
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;