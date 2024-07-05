import React from "react";
import {
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TiThMenuOutline } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/review">
                  <MdReviews></MdReviews>
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/bookings">
                  <FaList></FaList>
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <TiThMenuOutline></TiThMenuOutline>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salads">
              <FaList></FaList>
              Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
