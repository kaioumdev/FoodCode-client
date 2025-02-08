import {
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  // Restrict non-admin users from accessing Add Items & Manage Items
  const restrictedRoutes = ["/dashboard/addItems", "/dashboard/manageItems"];

  if (isAdmin === "user" && restrictedRoutes.includes(location.pathname)) {
    Swal.fire({
      title: "Access Denied!",
      text: "Only admins can access this page. Please go to user page & change your role as admin.",
      icon: "warning",
      confirmButtonText: "Go to User Page to Change Role",
    }).then(() => {
      navigate("/dashboard/users"); // Redirect to Users page to change role
    });

    return null; // Prevent rendering the restricted page
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dashboard Sidebar */}
      <div className="w-full md:w-64 bg-orange-400 p-4">
        <ul className="menu space-y-2">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList /> Payment History
                </NavLink>
              </li>
            </>
          ) : (
            <>

              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList /> Payment History
                </NavLink>
              </li>
            </>
          )}
          {/* Shared Links */}
          <div className="border-t my-2"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaSearch /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us">
              <FaEnvelope /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
