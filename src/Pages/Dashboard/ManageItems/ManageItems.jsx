import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `"${item.name}" has been removed.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <SectionTitle heading="Manage All Items" subHeading="Stay Organized" />

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-3 font-semibold">{item.name}</td>
                <td className="p-3 text-green-600 font-medium">${item.price}</td>
                <td className="p-3 flex space-x-3">
                  {/* Edit Button */}
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition px-3 py-1 rounded-lg flex items-center gap-2">
                      <FaEdit />
                      Edit
                    </button>
                  </Link>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition px-3 py-1 rounded-lg flex items-center gap-2"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show message if no items exist */}
        {menu.length === 0 && (
          <p className="text-center text-gray-500 py-6">No items found!</p>
        )}
      </div>
    </div>
  );
};

export default ManageItems;
