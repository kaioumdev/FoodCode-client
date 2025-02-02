// import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import { FaShoppingCart } from "react-icons/fa";
// import useCart from "../../../hooks/useCart";
// import useAdmin from "../../../hooks/useAdmin";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [cart] = useCart()
//   const [isAdmin] = useAdmin()

//   const handleLogOut = () => {
//     logOut()
//       .then(() => { })
//       .catch((error) => console.log(error));
//   };

//   const navOptions = (
//     <>
//       <li className="flex items-center justify-center">
//         <Link to="/">Home</Link>
//       </li>
//       <li className="flex items-center justify-center">
//         <Link to="/contact-us">Contact Us</Link>
//       </li>
//       <li className="flex items-center justify-center">
//         <Link to="/menu">Menu</Link>
//       </li>
//       <li className="flex items-center justify-center">
//         <Link to="/order/salads">Order</Link>
//       </li>
//       <li className="flex items-center justify-center">
//         <Link to="/signup">SignUp</Link>
//       </li>
//       {user && !isAdmin && (
//         <li className="flex items-center justify-center">
//           <Link to="/dashboard/userHome">Dashboard</Link>
//         </li>
//       )}
//       {user && isAdmin && (
//         <li className="flex items-center justify-center">
//           <Link to="/dashboard/adminHome">Dashboard</Link>
//         </li>
//       )}
//     </>
//   );

//   return (
//     <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//           >
//             {navOptions}
//           </ul>
//         </div>
//         <Link to="/" className="btn btn-ghost text-xl flex items-center justify-center">
//           FoodCode
//         </Link>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 flex items-center justify-center">
//           {navOptions}
//         </ul>
//       </div>
//       <div className="navbar-end gap-5 mx-5">
//         {/* <a className="btn flex items-center justify-center">Button</a> */}
//         <li className="flex items-center justify-center">
//           <Link to="/dashboard/cart">
//             <button className="btn flex items-center justify-center">
//               <FaShoppingCart />
//               <div className="badge badge-secondary">+{cart?.length}</div>
//             </button>
//           </Link>
//         </li>
//         {user ? (
//           <li className="flex items-center justify-center">
//             <button onClick={handleLogOut} className="btn btn-ghost">
//               LogOut
//             </button>
//           </li>
//         ) : (
//           <li className="flex items-center justify-center">
//             <button>
//               <Link to="/login">Login</Link>
//             </button>
//           </li>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Menu, X } from "lucide-react";
// import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-gray-800 cursor-pointer">Brand</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="#services" className="text-gray-700 hover:text-gray-900">Services</Link>
            <Link href="#contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="#about" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#services" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="#contact" className="text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
