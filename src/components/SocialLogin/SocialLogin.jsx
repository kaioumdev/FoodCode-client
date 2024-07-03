import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { signInWithGoogle, updateUserProfile } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        updateUserProfile(result.user.displayName, result.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-evenly bg-amber-600 p-3 mb-5 mx-8 rounded-md items-center">
      <FaGoogle></FaGoogle>
      <button onClick={handleGoogleSignIn}>SignInWithGoogle</button>
    </div>
  );
};

export default SocialLogin;
