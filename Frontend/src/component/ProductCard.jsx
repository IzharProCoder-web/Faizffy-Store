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
          navigate(`/products/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-lg p-2 bg-white w-full"
      >
        <div className="group cursor-pointer mb-2 w-full">
          <img
            className="w-full h-32 object-contain group-hover:scale-105 transition"
            src={product.image && product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="space-y-1">
          <p className="text-black font-medium text-sm truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < 4 ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            <p className="text-xs text-gray-500">(4)</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{currency}{product.offerPrice}</span>
              <span className="text-xs text-gray-500 line-through ml-1">
                {currency}{product.price}
              </span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center gap-1 bg-black/10 px-3 py-1.5 rounded-full text-xs"
                  onClick={() => addToCart(product._id)}
                >
                  <FaShoppingCart className="w-3 h-3" />
                  Add
                </button>
              ) : (
                <div className="flex items-center bg-black/10 rounded-full">
                  <button
                    onClick={() => setCount(() => removeFromCart(product._id))}
                    className="px-2 py-1 text-sm"
                  >
                    -
                  </button>
                  <span className="text-xs w-4 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => setCount(() => addToCart(product._id))}
                    className="px-2 py-1 text-sm"
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