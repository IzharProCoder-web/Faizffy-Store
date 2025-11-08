/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  useEffect(() => {
    if (searchQuery && typeof searchQuery === "string" && searchQuery.trim()) {
      navigate("/products");
      setOpen(false);
    }
  }, [searchQuery, navigate]);

  return (
    <>
      <nav className="hidden md:flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">
        <NavLink to="/" className="flex items-center gap-2">
          <img className="w-12 h-12" src={assets.logo} alt="Logo" />
          <p className="font-bold text-xl">FAIZZIFY</p>
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/faq">FAQ</NavLink>

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-4 py-2 rounded-full">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none placeholder-gray-500 w-48"
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} className="w-4 h-4" alt="search" />
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              className="w-6 opacity-80"
              alt="cart"
            />
            <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-8 py-2 bg-black text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-9 cursor-pointer"
                alt="profile"
              />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-36 rounded-md text-sm z-50">
                <li
                  onClick={() => navigate("/myOrders")}
                  className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-black hover:text-white cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <div className="md:hidden flex flex-col bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-3">
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <img src={assets.menu_icon} className="w-6 h-6" alt="menu" />
          </button>

          <NavLink to="/" className="flex items-center">
            <img className="w-10 h-10" src={assets.logo} alt="Logo" />
            <span className="font-bold text-lg text-gray-800">FAIZZIFY</span>
          </NavLink>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              className="w-6 h-6 opacity-80"
              alt="cart"
            />
            <span className="absolute -top-1 -right-1 text-xs text-white bg-black w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {getCartCount()}
            </span>
          </div>
        </div>

        <div className="px-5 pb-3">
          <div className="flex items-center gap-3 border border-gray-300 bg-white px-4 py-2.5 rounded-full shadow-sm">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
            />
            <img src={assets.search_icon} className="w-5 h-5" alt="search" />
          </div>
        </div>
      </div>

      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden flex flex-col py-6 px-6 overflow-y-auto"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-8 mt-4">
              <img className="w-10 h-10" src={assets.logo} alt="Logo" />
              <span className="font-bold text-xl text-gray-800">FAIZZIFY</span>
            </div>

            <nav className="flex flex-col gap-1 text-lg font-medium">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg hover:bg-gray-100 transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg hover:bg-gray-100 transition"
              >
                All Products
              </NavLink>
              {user && (
                <NavLink
                  to="/myOrders"
                  onClick={() => setOpen(false)}
                  className="py-3 px-2 rounded-lg hover:bg-gray-100 transition"
                >
                  My Orders
                </NavLink>
              )}
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg hover:bg-gray-100 transition"
              >
                Contact
              </NavLink>
              <NavLink
                to="/faq"
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg hover:bg-gray-100 transition"
              >
                FAQ
              </NavLink>
            </nav>

            <div className="mt-6">
              {!user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowUserLogin(true);
                  }}
                  className="w-full py-3 bg-black text-white rounded-full text-sm font-medium"
                >
                  Login
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      navigate("/myOrders");
                      setOpen(false);
                    }}
                    className="text-left py-3 px-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-left py-3 px-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-5 mt-10 pt-6 border-t">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl text-blue-600" />
              </a>
              <a href="https://www.instagram.com/faiziffy.pk?igsh=Y2FsY2E5eXl4NHVo" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-pink-600" />
              </a>
              <a href="https://www.tiktok.com/@faiziffy..pk?_r=1&_t=ZS-91CbbbQfBl2" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-2xl text-black" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Navbar;