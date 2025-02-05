// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res?.data;
//     },
//   });

//   const handleDelete = (user) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/users/${user._id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "User has been deleted.",
//               icon: "success",
//             });
//           }
//         });
//       }
//     });
//   };

//   // const handleMakeAdmin = (user) => {
//   //   axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
//   //     if (res.data.modifiedCount > 0) {
//   //       refetch();
//   //       Swal.fire({
//   //         position: "top-end",
//   //         icon: "success",
//   //         title: `${user?.name} is now an Admin!`,
//   //         showConfirmButton: false,
//   //         timer: 1500,
//   //       });
//   //     }
//   //   });
//   // };

//   const handleMakeAdmin = (user) => {
//     axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
//       if (res.data.modifiedCount > 0) {
//         refetch(); // Refresh the user list
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.name} is now ${res.data.newRole === "admin" ? "an Admin" : "a User"}!`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };


//   return (
//     <div>
//       <div className="flex justify-evenly my-4">
//         <h1>All Users</h1>
//         <h1>Total Users: {users.length}</h1>
//       </div>
//       <div>
//         <div className="overflow-x-auto">
//           <table className="table table-zebra">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user._id}>
//                   <th>{index + 1}</th>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   {/* <td>
//                     {user.role === "admin" ? (
//                       "Admin"
//                     ) : (
//                       <button
//                         onClick={() => handleMakeAdmin(user)}
//                         className="btn btn-lg bg-orange-500 xl"
//                       >
//                         <FaUsers />
//                       </button>
//                     )}
//                   </td> */}
//                   <td>
//                     <button
//                       onClick={() => handleMakeAdmin(user)}
//                       className={`btn btn-xl ${user.role === "admin" ? "bg-red-500" : "bg-orange-500"} xl`}
//                     >
//                       <FaUsers /> {user.role === "admin" ? "Make User" : "Make Admin"}
//                     </button>
//                   </td>

//                   <td>
//                     <button
//                       onClick={() => handleDelete(user)}
//                       className="btn btn-ghost btn-lg text-red-600 xl"
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;


// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { FaTrashAlt, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res?.data;
//     },
//   });

//   const handleDelete = (user) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/users/${user._id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "User has been removed.",
//               icon: "success",
//             });
//           }
//         });
//       }
//     });
//   };

//   const handleToggleRole = (user) => {
//     axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.name} is now ${user.role === "admin" ? "a User" : "an Admin"}!`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   return (
//     <div className="p-4 md:p-6 lg:p-8">
//       <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4">
//         <h1 className="text-xl md:text-2xl font-semibold">All Users</h1>
//         <h1 className="text-lg md:text-xl font-medium">Total Users: {users.length}</h1>
//       </div>

//       <div className="overflow-x-auto rounded-lg shadow-lg">
//         <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr className="text-left">
//               <th className="p-3">#</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id} className="border-b hover:bg-gray-100 transition-all">
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleToggleRole(user)}
//                     className={`px-3 py-1 rounded-lg font-medium text-white ${user.role === "admin" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
//                       } transition-all`}
//                   >
//                     {user.role === "admin" ? "Make User" : "Make Admin"}
//                   </button>
//                 </td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleDelete(user)}
//                     className="px-3 py-1 rounded-lg font-medium bg-gray-100 hover:bg-red-600 hover:text-white text-red-600 transition-all"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });

  const handleDelete = (user) => {
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
                    className="px-3 py-1 rounded-lg font-medium bg-gray-100 hover:bg-red-600 hover:text-white text-red-600 transition-all"
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
                className="px-3 py-1 rounded-lg font-medium bg-gray-100 hover:bg-red-600 hover:text-white text-red-600 transition-all"
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
