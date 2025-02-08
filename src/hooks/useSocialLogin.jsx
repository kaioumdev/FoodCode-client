import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";

const useSocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleSocialLogin = (provider) => {
        provider()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result?.user?.photoURL
                }
                console.log(userInfo);
                axiosPublic.post('/users', userInfo)
                    .then(res => {
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