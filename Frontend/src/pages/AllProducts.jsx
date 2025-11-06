import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";

// Skeleton Card Component (same as BestSeller)
const SkeletonCard = () => (
  <div className="border border-gray-500/20 px-1 bg-white w-full animate-pulse">
    <div className="group flex items-center justify-center mb-2">
      <div className="h-32 w-full bg-gray-200"></div>
    </div>
    <div className="text-gray-500/60 text-sm flex flex-col items-start gap-2 mb-2 px-2">
      <div className="h-5 bg-gray-200 rounded w-11/12"></div>
      <div className="flex items-center gap-0.5">
        {Array(5).fill("").map((_, i) => (
          <div key={i} className="w-3 h-3.5 bg-gray-200"></div>
        ))}
        <div className="h-4 w-8 bg-gray-200 rounded ml-1"></div>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-3 w-full">
        <div className="flex items-center gap-1">
          <div className="h-6 w-12 bg-gray-200"></div>
          <div className="h-4 w-10 bg-gray-200"></div>
        </div>
        <div className="h-[34px] w-full md:w-[80px] bg-gray-200 mt-3"></div>
      </div>
    </div>
  </div>
);

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading (remove if you have real async data)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  // Prepare in-stock filtered products
  const inStockProducts = filteredProducts.filter((product) => product.inStock);

  return (
    <div className="mt-16 flex flex-col ">
      <div className="flex flex-col items-start w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-[#4fbf8b] rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-10">
        {loading
          ? // Show 10 skeleton cards (adjust based on expected initial load)
            Array(10)
              .fill(null)
              .map((_, i) => <SkeletonCard key={`sk-${i}`} />)
          : inStockProducts.length > 0
          ? inStockProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          : // Optional: Empty state
            <p className="col-span-full text-center text-gray-500">
             
            </p>}
      </div>
    </div>
  );
};

export default AllProducts;