/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const titleVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const SkeletonCard = () => (
  <motion.div 
    className="border border-gray-500/20  bg-white w-full animate-pulse"
    variants={itemVariants}
  >
    <div className="group flex items-center justify-center mb-2">
      <div className="h-32 w-full bg-gray-200 "></div>
    </div>
    <div className="text-gray-500/60 text-sm flex flex-col items-start gap-2 mb-2 px-2">
      <div className="h-5 bg-gray-200 rounded w-11/12"></div>
      <div className="flex items-center gap-0.5">
        {Array(5).fill("").map((_, i) => (
          <div key={i} className="w-3 h-3.5 bg-gray-200 "></div>
        ))}
        <div className="h-4 w-8 bg-gray-200 rounded ml-1"></div>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-3 w-full">
        <div className="flex items-center gap-1">
          <div className="h-6 w-12 bg-gray-200 "></div>
          <div className="h-4 w-10 bg-gray-200 "></div>
        </div>
        <div className="h-[34px] w-full md:w-[80px] bg-gray-200 mt-3"></div>
      </div>
    </div>
  </motion.div>
)

const BestSeller = () => {
  const { products } = useAppContext()

  // Local loading state (replace with real loading flag if you have one)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data load – remove if you have real async logic
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Get first 6 products for mobile
  const mobileItems = products
    .filter((product) => product.inStock)
    .slice(0, 6)

  // Get first 5 products for desktop
  const desktopItems = products
    .filter((product) => product.inStock)
    .slice(0, 5)

  return (
    <motion.div 
      className='mt-10 px-6 md:px-16 lg:px-24 xl:px-32'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    > 
      {/* Header with View All button */}
      <motion.div 
        className='flex justify-between items-center'
        variants={titleVariants}
      >
        <motion.p 
          className='text-2xl md:text-3xl font-medium'
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Best Sellers
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to={"/products"}  
            className='text-sm md:text-base text-gray-600 hover:text-gray-800 underline'
          >
            View All
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Mobile view - 6 products in 2 columns */}
      <div className='block md:hidden'>
        <motion.div 
          className='grid grid-cols-2 gap-4 mt-6'
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
        >
          {loading
            ? Array(6).fill(null).map((_, i) => (
                <SkeletonCard key={`mobile-sk-${i}`} />
              ))
            : mobileItems.map((product, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </motion.div>
      </div>

      {/* Desktop view - 5 products in 5 columns */}
      <div className='hidden md:block'>
        <motion.div 
          className='grid grid-cols-5 gap-4 mt-6'
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
        >
          {loading
            ? Array(5).fill(null).map((_, i) => (
                <SkeletonCard key={`desktop-sk-${i}`} />
              ))
            : desktopItems.map((product, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BestSeller