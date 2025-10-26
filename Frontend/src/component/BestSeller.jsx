import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Scrollbar } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

const BestSeller = () => {
  const { products } = useAppContext()
  
  return (
    <div className='mt-8 px-4'> 
      <p className='text-xl font-medium mb-4'>Best Sellers</p>
      
      <Swiper
        slidesPerView={2.2}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode, Autoplay, Scrollbar]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        scrollbar={{
          hide: false,
          draggable: true,
          el: '.swiper-scrollbar',
        }}
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
        <div className="swiper-scrollbar mt-4"></div>
      </Swiper>
    </div>
  )
}

export default BestSeller