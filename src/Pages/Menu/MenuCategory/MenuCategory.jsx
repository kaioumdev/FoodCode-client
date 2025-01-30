/* eslint-disable react/prop-types */
import { useState } from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine the items to display based on the showAll state
  const displayedItems = showAll ? items : items.slice(0, 6);

  return (
    <div className="p-8">
      {title && title !== "offered" && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-4 my-16">
        {displayedItems.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center items-center gap-5">
        {/* Show "See More" button only if there are more than 6 items and not all are shown */}
        {items.length > 6 && !showAll && (
          <button
            className="btn btn-outline my-4"
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        )}
        {/* Always show the "Order" button */}
        <Link to={`/order/${title}`}>
          <button className="btn btn-outline">Order</button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;