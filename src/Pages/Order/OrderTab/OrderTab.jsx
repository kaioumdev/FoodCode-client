/* eslint-disable react/prop-types */
import { useState } from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0); // State for the current page
  const itemsPerPage = 6; // Number of items to display per page

  // Calculate the items to display for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // // Calculate the total number of pages
  // const totalPages = Math.ceil(items.length / itemsPerPage);

  // // Handle page button clicks
  // const handlePageClick = (pageIndex) => {
  //   setCurrentPage(pageIndex);
  // };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-10">
        {currentItems.map((item, index) => (
          <FoodCard key={index} item={item}></FoodCard>
        ))}
      </div>
      <div className="flex justify-center mt-8 my-4">
        {/* Render pagination buttons */}
        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`btn mx-1 ${currentPage === index ? "btn-primary" : "btn-outline"
                }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default OrderTab;
