import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const useSocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSocialLogin = (provider) => {
    provider()
      // signInWithGoogle()
      .then((result) => {
        console.log(result);
        // updateUserProfile(result.user.displayName, result.user.photoURL);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photoURL: result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { handleSocialLogin }
};

export default useSocialLogin;
