import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";

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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "",
    sortBy: "name"
  });

  const priceRanges = [
    { label: "Under Rs 500", value: "0-500" },
    { label: "Rs 500 - Rs 1000", value: "500-1000" },
    { label: "Rs 1000 - Rs 2000", value: "1000-2000" },
    { label: "Rs 2000 - Rs 5000", value: "2000-5000" },
    { label: "Over Rs 5000", value: "5000-50000" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = products.filter((product) => product.inStock);

    if (searchQuery.length > 0) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter((product) => {
        const price = product.offerPrice || product.price;
        return price >= min && price <= max;
      });
    }

    if (filters.sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === "price-low") {
      result.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
    }

    setFilteredProducts(result);
  }, [searchQuery, products, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: "",
      sortBy: "name"
    });
  };

  const inStockProducts = filteredProducts.filter((product) => product.inStock);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex flex-col items-start w-max mb-4 sm:mb-0">
          <p className="text-2xl font-medium uppercase">All Products</p>
          <div className="w-16 h-0.5 bg-[#4fbf8b] rounded-full"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">All Prices</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-white transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 text-sm text-gray-600">
        Showing {inStockProducts.length} products
        {filters.priceRange && (
          <span className="ml-2">
            (filtered)
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5">
        {loading
          ? Array(10)
              .fill(null)
              .map((_, i) => <SkeletonCard key={`sk-${i}`} />)
          : inStockProducts.length > 0
          ? inStockProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          : <p className="col-span-full text-center text-gray-500 py-8">
              No products found matching your criteria
            </p>}
      </div>
    </div>
  );
};

export default AllProducts;