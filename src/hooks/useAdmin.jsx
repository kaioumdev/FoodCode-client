import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  //   console.log(user);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      // console.log("asking or checking is admin", user, isAdmin);
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      // console.log("check is admin or not", res.data);
      return res.data?.role;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
