// import useAuth from "../../hooks/useAuth";
// import { FaGoogle } from "react-icons/fa";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useNavigate } from "react-router-dom";

// const useSocialLogin = () => {
//   const { signInWithGoogle } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();
//   const handleSocialLogin = (provider) => {
//     provider()
//       // signInWithGoogle()
//       // .then((result) => {
//       //   console.log(result);
//       //   // updateUserProfile(result.user.displayName, result.user.photoURL);
//       //   const userInfo = {
//       //     name: result.user?.displayName,
//       //     email: result.user?.email,
//       //     photoURL: result.user?.photoURL,
//       //   };
//       //   axiosPublic.post("/users", userInfo).then((res) => {
//       //     console.log(res.data);
//       //     navigate("/");
//       //   });
//       // })
//       .then(result => {
//         console.log(result.user);
//         const userInfo = {
//           email: result.user?.email,
//           name: result.user?.displayName,
//           photoURL: result.user?.photoURL
//         }
//         axiosPublic.post('/users', userInfo)
//           .then(res => {
//             console.log(res.data);
//             navigate('/');
//           })
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return { handleSocialLogin }
// };

// export default useSocialLogin;

import useAuth from "../../hooks/useAuth";
import { FaGoogle, FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
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

  // const handleGithubSignIn = () => {
  //   signInWithGithub()
  //     .then((result) => {
  //       console.log(result);
  //     })
  // }
  return (
    <div className="flex justify-evenly bg-amber-600 p-3 mb-5 mx-8 rounded-md items-center">
      <FaGoogle onClick={handleGoogleSignIn}></FaGoogle>
      {/* <FaGithub onClick={handleGithubSignIn} /> */}
      {/* <button >SignInWithGoogle</button> */}
    </div>
  );
};

export default SocialLogin;