/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    setLoading(true); // Start loader
    try {
      const { data } = await axios.get('/api/order/user', { withCredentials: true });
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Skeleton Item (same structure as real item)
  const SkeletonItem = () => (
    <div className="relative bg-white text-gray-500 border-b border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl animate-pulse">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="bg-gray-200 p-4 rounded-lg w-16 h-16" />
        <div className="ml-4 space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
      <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-28" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-20" />
    </div>
  );

  // Skeleton Order Card
  const SkeletonOrder = () => (
    <div className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
      <div className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-36" />
      </div>
      <SkeletonItem />
    </div>
  );

  return (
    <div className="mt-16 pb-10">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-black rounded-full"></div>
      </div>

      {/* Loading State */}
      {loading && (
        <>
          <SkeletonOrder />
          <SkeletonOrder />
        </>
      )}

      {/* No Orders */}
      {!loading && myOrders.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-lg">
          No orders are placed
        </div>
      )}

      {/* Real Orders */}
      {!loading &&
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
              <span>OrderId: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>
                Total Amount: {currency}
                {order.amount}
              </span>
            </p>
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white text-gray-500 ${
                  order.items && order.items.length !== index + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img src={item.product.image[0]} className="w-16 h-16" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-black">
                      {item.product.name}
                    </h2>
                    <p>Category: {item.product.category}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                  <p>Quantity: {item.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-black text-lg font-medium">
                  Amount: {currency}
                  {item.product.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default MyOrders;