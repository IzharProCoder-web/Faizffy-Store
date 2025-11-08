/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Order = () => {
  const { currency, axios } = useAppContext();
  const [ordersByDate, setOrdersByDate] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/order/seller', { withCredentials: true });
      if (data.success) {
        // Group orders by date
        const groupedOrders = groupOrdersByDate(data.orders || []);
        setOrdersByDate(groupedOrders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const groupOrdersByDate = (orders) => {
    const grouped = {};
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const dateKey = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      
      grouped[dateKey].push(order);
    });
    
    return grouped;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ------------------- Skeleton Components ------------------- */
  const SkeletonItem = () => (
    <div className="flex gap-5 animate-pulse">
      <div className="bg-gray-200 w-12 h-12 rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 justify-between animate-pulse">
      <SkeletonItem />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-36" />
        <div className="h-4 bg-gray-200 rounded w-56" />
        <div className="h-4 bg-gray-200 rounded w-48" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-20" />
      <div className="space-y-2 text-sm">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-28" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
  /* ---------------------------------------------------------- */

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-8">
        <h2 className="text-2xl font-bold">Orders Management</h2>

        {/* ----- Loading ----- */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {/* ----- Empty ----- */}
        {!loading && Object.keys(ordersByDate).length === 0 && (
          <p className="text-center py-8 text-gray-500">No orders available</p>
        )}

        {/* ----- Orders Grouped by Date ----- */}
        {!loading && Object.keys(ordersByDate).length > 0 && 
          Object.entries(ordersByDate)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // Sort dates descending
            .map(([date, orders]) => (
              <div key={date} className="space-y-4">
                {/* Date Header */}
                <div className="border-b border-gray-300 pb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{date}</h3>
                  <p className="text-sm text-gray-500">
                    {orders.length} order{orders.length > 1 ? 's' : ''} placed
                  </p>
                </div>

                {/* Orders for this date */}
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <div
                      key={order._id || idx}
                      className="flex flex-col md:flex-row md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 justify-between bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* ---- Product list with images ---- */}
                      <div className="flex gap-5 max-w-80">
                        {order.items?.map((item, iIdx) => {
                          const product = item.product;
                          const hasProduct = product && typeof product === 'object';
                          const imgSrc = hasProduct && product.image?.[0]
                            ? product.image[0]
                            : null;

                          return (
                            <div key={iIdx} className="flex items-center gap-3">
                              {imgSrc ? (
                                <img
                                  src={imgSrc}
                                  alt={product?.name || 'Product'}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <div className="bg-gray-200 w-12 h-12 rounded flex items-center justify-center text-xs text-gray-500">
                                  No Img
                                </div>
                              )}
                              <div>
                                <p className="font-medium">
                                  {hasProduct ? product.name : '—'}
                                  <span className="text-primary"> x {item.quantity}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* ---- Address ---- */}
                      <div className="text-sm md:text-base text-black/60">
                        <p className="text-black/80 font-medium">
                          {order.address?.firstName} {order.address?.lastName}
                        </p>
                        <p>
                          {order.address?.street}, {order.address?.city}
                        </p>
                        <p>
                          {order.address?.postalCode},{' '}
                          {order.address?.district}
                        </p>
                        <p>{order.address?.phone}</p>
                        <p>{order.address?.email}</p>
                      </div>

                      {/* ---- Amount ---- */}
                      <p className="font-medium text-lg my-auto">
                        {currency}
                        {order.amount?.toLocaleString() || 0}
                      </p>

                      {/* ---- Meta ---- */}
                      <div className="flex flex-col text-sm space-y-1">
                        <p className="font-medium">Method: {order.paymentType || '—'}</p>
                        <p>Time: {new Date(order.createdAt).toLocaleTimeString()}</p>
                        <p className={`font-medium ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                          Payment: {order.isPaid ? 'Paid' : 'Pending'}
                        </p>
                        <p className={`font-medium ${
                          order.status === 'delivered' ? 'text-green-600' : 
                          order.status === 'cancelled' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          Status: {order.status || 'pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Order;