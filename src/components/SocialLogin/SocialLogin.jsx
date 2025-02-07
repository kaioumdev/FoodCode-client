import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const useSocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSocialLogin = (provider) => {
    provider()
      .then(result => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data);
            navigate('/');
          })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { handleSocialLogin }
};

export default useSocialLogin;