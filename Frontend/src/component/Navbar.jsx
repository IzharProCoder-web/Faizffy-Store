/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // Import Framer Motion
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"; // Import React Icons

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", { withCredentials: true });
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to={"/"} className={"flex items-center "}>
        <img className="w-15 h-15" src={assets.logo} alt="Logo" />
        <p className="font-bold">FAIZZIFY</p>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/"> Home</NavLink>
        <NavLink to="/products"> All Products</NavLink>
        <NavLink to="/contact"> Contact</NavLink>
        <NavLink to="/faq"> FAQ</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} className="w-4 h-4" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#000] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-[#000] hover:bg-[#000] transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40 ">
              <li
                onClick={() => {
                  navigate("/myOrders");
                }}
                className="p-1.5 pl-3 hover:text-white hover:bg-[#000] cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:text-white hover:bg-[#000] cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#000] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button onClick={() => setShowUserLogin(true)} className="cursor-pointer">
            <img src={assets.profile_icon} className="w-8" />
          </button>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-8 cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
            {showMobileMenu && (
              <ul className="absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                <li
                  onClick={() => {
                    navigate("/myOrders");
                    setShowMobileMenu(false);
                  }}
                  className="p-1.5 pl-3 hover:text-white hover:bg-[#000] cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                  className="p-1.5 pl-3 hover:text-white hover:bg-[#000] cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          <img src={assets.menu_icon} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col  items-start gap-2 justify-center px-5 text-[18px] font-medium md:hidden z-10`}
        >
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>
          {user && (
            <NavLink to="/myOrders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/faq" onClick={() => setOpen(false)}>
            FAQ
          </NavLink>
          {!user && (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-[#000] hover:bg-[#000] transition text-white rounded-full text-sm"
            >
              Login
            </button>
          )}
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl text-blue-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl text-pink-600" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="text-xl text-black" />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
