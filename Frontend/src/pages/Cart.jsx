/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
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
        // Handle selectedSize if it exists in cart item
        if (cartItems[key] && typeof cartItems[key] === 'object' && cartItems[key].selectedSize) {
          product.selectedSize = cartItems[key].selectedSize;
          product.displayPrice = cartItems[key].displayPrice;
        }
        tempArray.push(product);
      }
    }
    console.log("Cart array:", tempArray); // Debug log
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get", { withCredentials: true });
      console.log("Address API response:", data); // Debug log
      
      if (data.success) {
        const addresses = data.addresses || [];
        console.log("Addresses found:", addresses); // Debug log
        
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
      console.error("Get address error:", err);
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
        toast.error("Please Select The Address ");
        return;
      }
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            selectedSize: item.selectedSize || '50ml', // Include selected size in order
            price: item.displayPrice || item.offerPrice // Use display price if available
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

  useEffect(() => {
    if (!user) {
      // toast.error("Please log in to place an order");
      // navigate("/login");
    } else {
      getUserAddress();
    }
  }, [user]);

  // Calculate price based on selected size or use offerPrice
  const getProductPrice = (product) => {
    if (product.displayPrice) {
      return product.displayPrice * product.quantity;
    }
    return product.offerPrice * product.quantity;
  };

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-black">{getCartCount()} items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-b border-gray-200 pb-4"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2">{product.name}</p>
                <div className="font-normal text-gray-500 space-y-1">
                  {/* Selected Size Section */}
                  <div className="flex items-center">
                    <p className="font-medium mr-2">Size:</p>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm border border-gray-300">
                      {product.selectedSize || '50ml'}
                    </span>
                  </div>
                  
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p className="mr-2">Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={product.quantity}
                      className="outline-none border border-gray-300 rounded px-2 py-1"
                    >
                      {Array(
                        product.quantity > 9
                          ? product.quantity > 9
                          : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-semibold text-gray-900">
              {currency}
              {getProductPrice(product).toFixed(2)}
            </p>
            <button
              className="cursor-pointer mx-auto hover:bg-gray-100 p-2 rounded-full transition-colors"
              onClick={() => removeFromCart(product._id)}
            >
              <img
                src={assets.remove_icon}
                alt="remove icon"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-black font-medium hover:text-gray-700 transition-colors"
        >
          <img
            src={assets.arrow_right_icon_colored}
            className="group-hover:-translate-x-1 transition-transform"
            alt="continue shopping"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100 p-5 max-md:mt-16 border border-gray-300">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-700 text-sm">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.district}, ${selectedAddress.postalCode}`
                : "Add Address"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-black hover:underline cursor-pointer text-sm whitespace-nowrap ml-2"
            >
              Add / Change
            </button>
            {showAddress && (
              <div className="absolute top-12 right-0 py-1 bg-white border border-gray-300 text-sm w-full z-10 rounded shadow-lg">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.district},{" "}
                    {address.postalCode}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-white bg-black text-center cursor-pointer p-2 hover:bg-gray-800"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded"
          >
            <option value="COD">Cash On Delivery</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-black">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {((getCartAmount() * 2) / 100).toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3 text-gray-900">
            <span>Total Amount:</span>
            <span>
              {currency} {(getCartAmount() + (getCartAmount() * 2) / 100).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-black text-white font-medium hover:bg-gray-800 transition rounded"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : (
    <div className="mt-16 flex flex-col items-center justify-center min-h-96">
      <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>
      <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
      <button
        onClick={() => {
          navigate("/products");
          scrollTo(0, 0);
        }}
        className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Cart;