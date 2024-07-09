import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useState } from "react";

const UpdateItem = () => {
  const item = useLoaderData();
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  const handleUpdate = async () => {
    const updatedItem = { name, price };
    const response = await fetch(`http://localhost:5000/menu/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
    });
    if (response.ok) {
      console.log("Item updated successfully");
    } else {
      console.error("Failed to update item");
    }
  };

  return (
    <div>
      <SectionTitle heading="Update Item" subHeading="Refresh Info" />
      {item ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Item</button>
        </div>
      ) : (
        <p>Loading item data...</p>
      )}
    </div>
  );
};

export default UpdateItem;
