/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    updateCartItem,
    currency,
    navigate,
    getCartCount,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = (products) => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        if (cartItems[key] && typeof cartItems[key] === 'object' && cartItems[key].selectedSize) {
          product.selectedSize = cartItems[key].selectedSize;
          product.displayPrice = cartItems[key].displayPrice;
        }
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get", { withCredentials: true });
      if (data.success) {
        const addresses = data.addresses || [];
        setAddresses(addresses);
        if (addresses.length > 0) {
          setSelectedAddress(addresses[0]);
        } else {
          setSelectedAddress(null);
        }
      } else {
        toast.error(data.message || "Failed to load addresses");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load addresses");
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart(products);
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  const placeOrder = async () => {
    try {
      if (cartArray.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      if (!selectedAddress) {
        toast.error("Please select delivery address");
        return;
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            selectedSize: item.selectedSize || '50ml',
            price: item.displayPrice || item.offerPrice
          })),
          address: selectedAddress,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/myOrders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getProductPrice = (product) => {
    if (product.displayPrice) {
      return product.displayPrice * product.quantity;
    }
    return product.offerPrice * product.quantity;
  };

  const shippingFee = 200;
  const subtotal = getCartAmount();
  const totalAmount = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg">
        {products.length > 0 && cartItems && Object.keys(cartItems).length > 0 ? (
          <div className="flex flex-col-reverse lg:flex-row md:gap-8 gap-4">
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Shopping Cart
                  </h1>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="hidden md:grid grid-cols-12 gap-4 text-gray-600 text-sm font-medium pb-4 border-b border-gray-200">
                  <div className="col-span-6">
                    <p>Product Details</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p>Quantity</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p>Price</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p>Action</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {cartArray.map((product, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 py-6 border-b border-gray-100 last:border-0">
                      <div className="flex-1 flex items-start gap-4">
                        <div 
                          onClick={() => {
                            navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                            scrollTo(0, 0);
                          }}
                          className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
                        >
                          <img
                            className="w-full h-full object-cover rounded-lg"
                            src={product.image[0]}
                            alt={product.name}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Size:</span>
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-300">
                                {product.selectedSize || '50ml'}
                              </span>
                            </div>
                            <p className="flex items-center gap-2">
                              <span className="font-medium">Weight:</span>
                              <span>{product.weight || "N/A"}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-center md:w-32">
                        <div className="md:hidden font-medium text-gray-600">Qty:</div>
                        <select
                          onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                          value={product.quantity}
                          className="outline-none border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          {Array.from({ length: product.quantity > 9 ? product.quantity : 9 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-between md:justify-center md:w-32">
                        <div className="md:hidden font-medium text-gray-600">Price:</div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {currency}
                          {getProductPrice(product).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-end md:justify-center md:w-32">
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    navigate("/products");
                    scrollTo(0, 0);
                  }}
                  className="group flex items-center gap-2 mt-8 text-gray-700 hover:text-black font-medium transition-colors duration-200"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className="lg:max-w-md w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">Delivery Address</h3>
                      <button
                        onClick={() => navigate("/add-address")}
                        className="text-sm text-black hover:text-gray-700 font-medium flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New
                      </button>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="w-full text-left p-3 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors"
                      >
                        {selectedAddress ? (
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {selectedAddress.street}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              {selectedAddress.city}, {selectedAddress.district}, {selectedAddress.postalCode}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">Select delivery address</p>
                        )}
                        <svg 
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${showAddress ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showAddress && addresses.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {addresses.map((address, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setSelectedAddress(address);
                                setShowAddress(false);
                              }}
                              className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              <p className="font-medium text-gray-900 text-sm">
                                {address.street}
                              </p>
                              <p className="text-gray-600 text-sm mt-1">
                                {address.city}, {address.district}, {address.postalCode}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                    <select
                      value={paymentOption}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="w-full border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="COD">Cash On Delivery</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <span>{currency}{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span>{currency}{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={!selectedAddress}
                  className={`w-full py-3 mt-6 font-medium rounded-lg transition-colors duration-200 ${
                    selectedAddress 
                      ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <div className="w-24 h-24 mb-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;