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
          if (product?.category) {
            navigate(`/products/${product.category.toString().toLowerCase()}/${product._id}`);
            scrollTo(0, 0);
          }
        }}
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36 ml-2 object-contain"
            src={product.image && product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p className="text-gray-700 font-medium text-lg truncate w-full">
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
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-[#000]">
              {currency} {product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}{product.price}
              </span>
            </p>
            <div
              className="text-[#000]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-[#000] font-medium"
                  onClick={() => addToCart(product._id)}
                >
                  <FaShoppingCart className="text-black" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#000]/25 rounded select-none">
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