import React from 'react';

const WhyWeAreTheBest = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200 my-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why We Are The Best</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <div className="text-gray-700 text-3xl mb-4">🌸</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality Fragrances</h3>
            <p className="text-gray-600">We source our perfumes from world-renowned perfumers, ensuring long-lasting, authentic scents crafted with the finest ingredients.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <div className="text-gray-700 text-3xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Collections</h3>
            <p className="text-gray-600">Discover unique, limited-edition fragrances you won't find anywhere else, tailored to elevate your personal style.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300">
            <div className="text-gray-700 text-3xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Free Shipping</h3>
            <p className="text-gray-600">Enjoy complimentary shipping on all orders, with fast delivery to ensure your favorite scents arrive promptly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeAreTheBest;