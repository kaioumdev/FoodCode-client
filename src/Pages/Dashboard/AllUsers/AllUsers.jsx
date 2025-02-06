import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });

  const handleDelete = (user) => {
    if (isAdmin === "user") {
      Swal.fire({
        title: "Permission Denied",
        text: "Only admins can delete users.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleToggleRole = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now ${user.role === "admin" ? "a User" : "an Admin"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">All Users</h1>
        <h1 className="text-lg md:text-xl font-medium">Total Users: {users.length}</h1>
      </div>

      {/* Show table on medium and large screens */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-100 transition-all">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleRole(user)}
                    className={`px-3 py-1 rounded-lg font-medium text-white ${user.role === "admin" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                      } transition-all`}
                  >
                    {user.role === "admin" ? "Make User" : "Make Admin"}
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user)}
                    disabled={!isAdmin} // Disable button if not admin
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${isAdmin
                      ? "bg-gray-100 hover:bg-red-600 hover:text-white text-red-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show cards on small screens */}
      <div className="sm:hidden">
        {users.map((user, index) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => handleToggleRole(user)}
                className={`px-3 py-1 rounded-lg font-medium text-white ${user.role === "admin" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                  } transition-all`}
              >
                {user.role === "admin" ? "Make User" : "Make Admin"}
              </button>
              <button
                onClick={() => handleDelete(user)}
                disabled={!isAdmin}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${isAdmin
                  ? "bg-gray-100 hover:bg-red-600 hover:text-white text-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
