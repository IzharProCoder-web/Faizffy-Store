import React, { useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("10ml");

  const {
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    navigate,
  } = useAppContext();

  const ImageSkeleton = () => (
    <div className="w-full aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
  );

  const hasImage = product?.image?.[0] && product.image[0] !== "/placeholder.png";

  const discountPercentage = product.price !== product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  // Size options with their prices
  const sizeOptions = [
    { size: "10ml", price: product.offerPrice, originalPrice: product.price },
    { size: "30ml", price: (product.offerPrice * 1.5).toFixed(2), originalPrice: (product.price * 1.5).toFixed(2) },
    { size: "50ml", price: (product.offerPrice * 2.5).toFixed(2), originalPrice: (product.price * 2.5).toFixed(2) }
  ];

  const selectedSizeData = sizeOptions.find(option => option.size === selectedSize);

  return (
    product && (
      <article className="group cursor-pointer border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden w-full max-w-xs mx-auto">
        {/* ---------- IMAGE SECTION ---------- */}
        <div 
          className="relative bg-gray-50 aspect-[3/4] overflow-hidden"
          onClick={() => {
            if (product?._id) {
              navigate(`/products/${product._id}`);
              window.scrollTo(0, 0);
            }
          }}
        >
          {hasImage ? (
            <>
              {imageLoading && <ImageSkeleton />}
              <img
                src={product.image[0]}
                alt={product.name}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                style={{ position: imageLoading ? "absolute" : "relative" }}
              />
            </>
          ) : (
            <ImageSkeleton />
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* ---------- CONTENT SECTION ---------- */}
        <div className="p-3 sm:p-4">
          {/* Product Title */}
          <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2 leading-tight min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                    i < 4 ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">(4.0)</span>
          </div>

          {/* Brand */}
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">Inspire By Scents And Stories</p>

          {/* Size Selection */}
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-700 mb-2 block">Size:</label>
            <div className="flex gap-1 sm:gap-2">
              {sizeOptions.map((option) => (
                <button
                  key={option.size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(option.size);
                  }}
                  className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium border transition-all duration-200 rounded ${
                    selectedSize === option.size
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {option.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center mb-3">
            <p className="text-sm sm:text-[14px] font-bold text-gray-900">
              {currency}
              {selectedSizeData.price}
            </p>
            {selectedSizeData.originalPrice !== selectedSizeData.price && (
              <del className="text-[10px] sm:text-[11px] pl-1.5 text-red-500">
                {currency}
                {selectedSizeData.originalPrice}
              </del>
            )}
          </div>

          {/* Add to Cart Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full"
          >
            {!cartItems[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="flex items-center justify-center gap-1.5 w-full bg-black hover:bg-gray-800 text-white py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg hover:shadow-md active:scale-95"
              >
                <FaShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 rounded-lg border border-gray-300 p-1">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 font-medium text-lg transition-colors rounded"
                >
                  −
                </button>
                <span className="text-sm font-semibold text-gray-900">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 font-medium text-lg transition-colors rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    )
  );
};

export default ProductCard;