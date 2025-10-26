import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

const BestSeller = () => {
  const { products } = useAppContext()
  
  return (
    <div className='mt-16 px-6 md:px-16 lg:px-24 xl:px-32'> 
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      
      {/* Mobile view with Swiper - showing 2.5 slides */}
      <div className='block md:hidden mt-6'>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="w-full"
        >
          {products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Desktop view - simple grid */}
      <div className='hidden md:flex  items-center justify-center gap-4 mt-6' >
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  )
}

export default BestSeller