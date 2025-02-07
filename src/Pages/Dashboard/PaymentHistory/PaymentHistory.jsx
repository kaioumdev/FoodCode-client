// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const PaymentHistory = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: payments = [] } = useQuery({
//     queryKey: ["payments", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });
//   return (
//     <div>
//       <h1 className="text-3xl">Total Payments: {payments.length}</h1>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Price</th>
//               <th>Transaction Id</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment, index) => (
//               <tr key={payment._id}>
//                 <th>{index + 1}</th>
//                 <td>{payment.price}</td>
//                 <td>{payment.transactionId}</td>
//                 <td>{payment.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">💳 Payment History</h1>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Transaction ID</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 font-medium">💰 ${payment.price}</td>
                <td className="py-3 px-6">{payment.transactionId}</td>
                <td
                  className={`py-3 px-6 font-semibold ${payment.status === "Success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="md:hidden space-y-4">
        {payments.map((payment, index) => (
          <div
            key={payment._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">#{index + 1}</span>
              <span
                className={`text-sm font-bold ${payment.status === "Success" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {payment.status}
              </span>
            </div>
            <p className="text-lg font-semibold">💰 ${payment.price}</p>
            <p className="text-gray-600 text-sm break-words">
              <span className="font-medium">Transaction ID:</span> {payment.transactionId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
