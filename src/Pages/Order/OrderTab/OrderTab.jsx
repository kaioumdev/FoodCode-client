// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import FoodCard from "../../../components/FoodCard/FoodCard";

// const OrderTab = ({ items }) => {
//   const [currentPage, setCurrentPage] = useState(0); // State for the current page
//   const itemsPerPage = 6; // Number of items to display per page

//   // Calculate the items to display for the current page
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = items.slice(startIndex, endIndex);

//   // Calculate the total number of pages
//   const totalPages = Math.ceil(items.length / itemsPerPage);

//   // Handle page button clicks
//   const handlePageClick = (pageIndex) => {
//     setCurrentPage(pageIndex);
//   };

//   return (
//     <div>
//       <div className="grid md:grid-cols-3 gap-10">
//         {currentItems.map((item, index) => (
//           <FoodCard key={index} item={item}></FoodCard>
//         ))}
//       </div>
//       <div className="flex justify-center mt-8 my-4">
//         {/* Render pagination buttons */}
//         {Array.from(
//           { length: totalPages },
//           (_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageClick(index)}
//               className={`btn mx-1 ${currentPage === index ? "btn-primary" : "btn-outline"
//                 }`}
//             >
//               {index + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderTab;


/* eslint-disable react/prop-types */
import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {currentItems.map((item, index) => (
          <FoodCard key={index} item={item} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-3 py-1 rounded-md ${currentPage === index ? "bg-blue-500 text-white" : "bg-gray-200"
                } hover:bg-blue-600 transition`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTab;
