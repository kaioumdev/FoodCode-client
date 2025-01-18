/* eslint-disable react/prop-types */
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div className="p-8">
      {title && title !== "offered" && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-4 my-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        {" "}
        <button className="btn btn-outline">Order</button>{" "}
      </Link>
    </div>
  );
};

export default MenuCategory;
