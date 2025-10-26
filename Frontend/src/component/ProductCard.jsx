/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const [count, setCount] = useState(0);
  const {
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    navigate,
  } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          if (product?._id) {
            navigate(`/products/${product._id}`);
            scrollTo(0, 0);
          }
        }}
        className="border border-gray-500/20 rounded-md px-1 bg-white w-30 md:w-40 "
      >
        <div className="group cursor-pointer flex items-center justify-center mb-2">
          <img
            className="group-hover:scale-105 transition max-w-30 md:max-w-40 "
            src={product.image && product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm flex flex-col items-start gap-2 mb-2 px-2">
          <p className="text-gray-700 font-medium text-lg truncate w-full text-start">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`md:w-3.5 w-3 h-3.5 text-black ${i < 4 ? "opacity-100" : "opacity-30"}`}
                />
              ))}
            <p>(4)</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-[#000]">
              {currency} {product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}{product.price}
              </span>
            </p>
            <div
              className="text-[#000] w-full md:w-auto"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 w-full md:w-[80px] h-[34px] rounded text-[#000] font-medium mt-3"
                  onClick={() => addToCart(product._id)}
                >
                  <FaShoppingCart className="text-black" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full md:w-20 h-[34px] bg-[#000]/25 rounded select-none mt-3">
                  <button
                    onClick={() => setCount(() => removeFromCart(product._id))}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => setCount(() => addToCart(product._id))}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;