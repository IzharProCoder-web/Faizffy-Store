import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FaStar } from "react-icons/fa";

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

const getRandomReviews = () => {
  const shuffled = [...customerReviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};

const ProductsDetail = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [reviews, setReviews] = useState([]);
  
  const product = products.find((item) => item._id === id);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice()
        .filter(item => item._id !== product._id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
      setRelatedProducts(productsCopy);
    }
  }, [products, product]);

  useEffect(() => {
    if (product) {
      setThumbnail(product.image[0] ? product.image[0] : null);
    }
  }, [product]);

  useEffect(() => {
    setReviews(getRandomReviews());
  }, [product]);

  const handleAddToCart = () => {
    const productWithSize = {
      ...product,
      selectedSize: '50ml',
      displayPrice: product.offerPrice || product.price,
      originalPrice: product.price
    };
    addToCart(productWithSize._id, productWithSize);
  };

  const handleBuyNow = () => {
    const productWithSize = {
      ...product,
      selectedSize: '50ml',
      displayPrice: product.offerPrice || product.price,
      originalPrice: product.price
    };
    addToCart(productWithSize._id, productWithSize);
    navigate("/cart");
  };

  const ProductImages = () => {
    if (!product) return null;

    if (isMobile) {
      return (
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {product.image.map((image, index) => (
            <SwiperSlide key={index}>
              <img 
                src={image} 
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return (
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          {product.image.map((image, index) => (
            <div
              key={index}
              onClick={() => setThumbnail(image)}
              className="border max-w-24 border-gray-300 rounded overflow-hidden cursor-pointer"
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="border border-gray-300 max-w-100 rounded overflow-hidden">
          <img src={thumbnail} alt="Selected product" />
        </div>
      </div>
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (!product) {
    return (
      <div className="mt-12 flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-2xl font-medium text-gray-600">Product not found</p>
          <Link 
            to="/products" 
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = product.offerPrice || product.price;

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <nav className="mb-6">
        <p className="text-sm text-gray-600">
          <Link to={"/"} className="text-black hover:text-gray-600 transition-colors">Home</Link> /
          <Link to={"/products"} className="text-black hover:text-gray-600 transition-colors ml-1"> Products</Link> /
          <span className="text-gray-500 ml-1"> {product.name}</span>
        </p>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <ProductImages />
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">(4.0)</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-green-600 font-medium">In Stock</span>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-3">Size</p>
            <div className="flex gap-3">
              <button
                className="px-6 py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
              >
                50ml
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {currency}
                {currentPrice}
              </p>
              {product.offerPrice < product.price && (
                <p className="text-lg text-red-500 line-through">
                  {currency}
                  {product.price}
                </p>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <p>(inclusive of all taxes)</p>
            </div>
          </div>

          <p className="text-[16px] text-gray-700 mb-3 line-clamp-1">Inspire By Scents And Stories</p>
          

          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-900 mb-3">About Product</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {product.description ? (
                product.description
                  .split('\n')
                  .filter(line => line.trim().length > 0)
                  .map((line, index) => (
                    <li key={index}>{line.trim()}</li>
                  ))
              ) : (
                <li>No description available</li>
              )}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors duration-200 rounded-lg border border-gray-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 font-medium bg-black text-white hover:bg-gray-800 transition-colors duration-200 rounded-lg"
            >
              Buy Now
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Category:</span>
                <span className="text-gray-600 ml-2">{product.category}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Size:</span>
                <span className="text-gray-600 ml-2">50ml</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">SKU:</span>
                <span className="text-gray-600 ml-2">{product._id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Customer Reviews</h2>
          <div className="w-20 h-1 bg-black rounded-full mt-3"></div>
        </div>

        {isMobile ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mx-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.age} years • {review.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
                  <p className="text-xs text-gray-400 text-right">
                    {new Date(review.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.age} years • {review.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
                <p className="text-xs text-gray-400 text-right">
                  {new Date(review.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-20">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">You May Also Like</h2>
          <div className="w-20 h-1 bg-black rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="px-12 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-200 rounded-lg"
          >
            View All Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsDetail;