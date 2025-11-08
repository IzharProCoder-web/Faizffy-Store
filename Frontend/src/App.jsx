// App.jsx
import React from "react";
import Navbar from "./component/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./component/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./component/Login";
import AllProducts from "./pages/AllProducts";
import ProductsDeatil from "./pages/ProductsDeatil";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./component/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProducts from "./pages/seller/AddProducts";
import ProductsList from "./pages/seller/ProductsList";
import Order from "./pages/seller/Order";
import ContactUS from "./pages/ContactUS";
import FAQ from "./pages/FAQ";
import FirstOrderPopup from "./component/FirstOrderPopup";
import useFirstOrderPopup from "./hooks/useFirstOrderPopup";
import { FaWhatsapp } from "react-icons/fa";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { showUserLogin, isSeller } = useAppContext();
  const { open, close } = useFirstOrderPopup();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />

      {open && <FirstOrderPopup onClose={close} />}

      <div
        className={`${
          isSellerPath ? "" : isHomePage ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductsDeatil />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProducts /> : null} />
            <Route path="/seller/product-list" element={<ProductsList />} />
            <Route path="/seller/orders" element={<Order />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}

      {!isSellerPath && (
        <a 
          href="https://wa.me/+923129167292" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
      )}
    </div>
  );
};

export default App;