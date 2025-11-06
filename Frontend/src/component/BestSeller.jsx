import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

/* -------------------------------------------------
   Skeleton Card – matches your exact card size
------------------------------------------------- */
const SkeletonCard = () => (
  <div className="border border-gray-500/20  px-1 bg-white w-30 md:w-40 animate-pulse">
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
  </div>
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

  const items = products
    .filter((product) => product.inStock)
    .slice(0, 5)

  return (
    <div className='mt-16 px-6 md:px-16 lg:px-24 xl:px-32'> 
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      
      {/* Mobile view with Swiper */}
      <div className='block md:hidden mt-6'>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="w-full"
        >
          {loading
            ? Array(5).fill(null).map((_, i) => (
                <SwiperSlide key={`mobile-sk-${i}`}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : items.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* Desktop view */}
      <div className='hidden md:flex items-center justify-center gap-4 mt-6'>
        {loading
          ? Array(5).fill(null).map((_, i) => (
              <SkeletonCard key={`desktop-sk-${i}`} />
            ))
          : items.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>
    </div>
  )
}

export default BestSeller