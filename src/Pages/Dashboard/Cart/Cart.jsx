import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((prev, curr) => prev + curr.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Cart Summary */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">My Cart</h1>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <h2 className="text-gray-600 text-lg">
            Total Price: <span className="text-yellow-600">${totalPrice}</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Total Items: <span className="text-yellow-600">{cart.length}</span>
          </p>
          {cart.length ? (
            <Link to="/dashboard/payment">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Pay Now
              </button>
            </Link>
          ) : (
            <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-md">
              Pay
            </button>
          )}
        </div>
      </div>

      {/* Cart Table */}
      <div className="w-full max-w-2xl mt-6">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id} className="border-b text-center">
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-md"
                  />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;

