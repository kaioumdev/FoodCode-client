import React from "react";
import useCart from "../../../hooks/useCart";

const Cart = () => {
  const [cart] = useCart();
  const totalPrice = cart.reduce(
    (prevItem, currItem) => prevItem + currItem.price,
    0
  );
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {cart.map((item) => (
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {item.name}
              </td>
              <td>{totalPrice}</td>
              <th>
                <button className="btn btn-ghost btn-xs">Action</button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Cart;
