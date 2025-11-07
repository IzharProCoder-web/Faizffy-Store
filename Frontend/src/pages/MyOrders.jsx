/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/order/user', { withCredentials: true });
      if (data.success) {
        setMyOrders(data.orders || []);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Skeleton Components (unchanged)
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

  const SkeletonOrder = () => (
    <div className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
      <div className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-40" />
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
          No orders placed yet
        </div>
      )}

      {/* Real Orders */}
      {!loading &&
        myOrders.map((order, index) => (
          <div
            key={order._id || index}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            {/* Order Header */}
            <div className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col space-y-2 mb-4">
              <span>Order ID: #{order._id?.slice(-8)}</span>
              <span>
                Total: bilg{currency}
                {order.amount?.toLocaleString() || 0}
              </span>
            </div>

            {/* Order Items */}
            {order.items?.map((item, idx) => {
              const product = item.product;
              const hasProduct = product && typeof product === "object";

              return (
                <div
                  key={idx}
                  className={`relative bg-white text-gray-700 ${
                    order.items.length !== idx + 1 && "border-b"
                  } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {hasProduct && product.image?.[0] ? (
                        <img
                          src={product.image[0]}
                          alt={product.name || "Product"}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-black">
                        {hasProduct ? product.name : "Product Unavailable"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {hasProduct ? product.category : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-sm">
                    <p>Qty: <strong>{item.quantity || 1}</strong></p>
                    <p>Status: <strong className="text-orange-600">{order.status || "Pending"}</strong></p>
                    <p className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-PK')}
                    </p>
                  </div>

                  <p className="text-black text-lg font-semibold">
                    {currency}
                    {hasProduct
                      ? (product.offerPrice * item.quantity).toLocaleString()
                      : "—"}
                  </p>
                </div>
              );
            })}

            {/* COD Note */}
            <div className="mt-4 pt-3 border-t border-gray-200 text-sm text-gray-500 text-right">
              Payment on Delivery (COD)
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyOrders;