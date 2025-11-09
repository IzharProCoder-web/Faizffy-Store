import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const customerReviews = [
  {
    id: 1,
    name: "Ayesha Khan",
    age: 28,
    gender: "female",
    rating: 5,
    comment: "Absolutely love this floral perfume! The scent lasts all day and gets me so many compliments.",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Ali Ahmed",
    age: 32,
    gender: "male",
    rating: 4,
    comment: "Great woody scent for formal occasions. Not too overpowering, just perfect.",
    date: "2024-12-10"
  },
  {
    id: 3,
    name: "Fatima Raza",
    age: 25,
    gender: "female",
    rating: 5,
    comment: "This citrus perfume is so refreshing! Perfect for summer days in Karachi heat.",
    date: "2024-12-08"
  },
  {
    id: 4,
    name: "Bilal Siddiqui",
    age: 35,
    gender: "male",
    rating: 4,
    comment: "Good value for money. The oriental essence is authentic and long-lasting.",
    date: "2024-12-05"
  },
  {
    id: 5,
    name: "Sana Malik",
    age: 29,
    gender: "female",
    rating: 5,
    comment: "My new favorite! The aromatic blend is simply divine. Will definitely repurchase.",
    date: "2024-12-01"
  },
  {
    id: 6,
    name: "Omar Farooq",
    age: 31,
    gender: "male",
    rating: 3,
    comment: "Decent aqua notes but doesn't last as long as I expected. Okay for the price.",
    date: "2024-11-28"
  },
  {
    id: 7,
    name: "Zainab Hashmi",
    age: 26,
    gender: "female",
    rating: 4,
    comment: "Lovely spicy accents that aren't too strong. Perfect for evening events.",
    date: "2024-11-25"
  },
  {
    id: 8,
    name: "Usman Chaudhry",
    age: 33,
    gender: "male",
    rating: 5,
    comment: "Excellent floral fragrance! My wife loves when I wear this. Highly recommended.",
    date: "2024-11-20"
  }
];

const Reviews = () => {
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Customer Reviews
      </h2>
      
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          loop={true}
          className="reviews-swiper"
        >
          {customerReviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
                {/* Review Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">
                      {review.age} • {review.gender === 'female' ? '♀' : '♂'}
                    </p>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
      </div>

      {/* Swiper Styles */}
      <style jsx>{`
        .reviews-swiper {
          padding: 20px 0;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Reviews;