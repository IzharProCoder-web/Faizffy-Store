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
    removeFromCart,
    navigate,
  } = useAppContext();

  return (
    product && (
      <article
        onClick={() => {
          if (product?._id) {
            navigate(`/products/${product._id}`);
            window.scrollTo(0, 0);
          }
        }}
        className="group cursor-pointer overflow-hidden  border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        {/* ---------- IMAGE ---------- */}
        <div className=" overflow-hidden bg-gray-50">
          <img
            src={product.image?.[0] ?? "/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className=" flex flex-col gap-2 text-start mb-2">
          {/* Title */}
          <h3 className="truncate text-[18px] font-semibold pt-2 text-gray-900 text-start">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? "text-black" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1">(4)</span>
          </div>

          {/* Price + CTA */}
          <div className="flex  flex-col  gap-2">
            <div className="flex items-end gap-2">
              <p className="text-lg font-bold text-gray-900">
                {currency}
                {product.offerPrice}
              </p>
              {product.price !== product.offerPrice && (
                <del className="text-sm text-gray-400">
                  {currency}
                  {product.price}
                </del>
              )}
            </div>

            {/* Add / Counter */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center w-full"
            >
              {!cartItems[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white transition "
                >
                  <FaShoppingCart className="h-4 w-4" />
                  Add
                </button>
              ) : (
                <div className="flex h-9 items-center rounded-lg bg-gray-100">
                  <button
                    onClick={() => setCount(() => removeFromCart(product._id))}
                    className="px-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center font-medium">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => setCount(() => addToCart(product._id))}
                    className="px-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    )
  );
};

export default ProductCard;