import React from 'react';
import { FaLeaf, FaAward, FaShippingFast, FaHeadset } from 'react-icons/fa';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gray-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Faizffy Store</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Where luxury meets authenticity. We are passionate about bringing you the finest 
              inspired fragrances that captivate your senses and tell your unique story.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to make luxury fragrances accessible to everyone, 
                Faizffy Store has been crafting inspired scents that resonate with modern 
                individuals. We believe that every person deserves to experience the magic 
                of premium fragrances without compromise.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a simple idea: create high-quality, inspired perfumes 
                that tell stories and evoke emotions. Each fragrance in our collection is 
                carefully curated to ensure it meets our standards of excellence and delivers 
                an unforgettable experience.
              </p>
              <p className="text-gray-600">
                Today, we continue to innovate and expand our collection, always staying true 
                to our core values of quality, authenticity, and customer satisfaction.
              </p>
            </div>
            <div className="rounded-lg h-80 flex items-center justify-center">
              <span className="w-full h-full"><img src={assets.store_img} className='w-full h-full' /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Faizffy Store
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We use only the finest ingredients to create fragrances that last longer and smell better.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous testing to ensure it meets our high standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to get your favorite fragrances to you as soon as possible.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">
                Our dedicated team is here to help you find the perfect scent and answer any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To democratize luxury fragrances by creating inspired scents that are accessible, 
                high-quality, and environmentally conscious. We strive to make every individual 
                feel special and confident through the power of scent.
              </p>
              <p className="text-gray-600">
                We are committed to sustainable practices and ethical sourcing, ensuring that 
                our passion for fragrances doesn't come at the cost of our planet or people.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To become the most trusted destination for inspired luxury fragrances worldwide, 
                known for our uncompromising quality, innovative scents, and exceptional 
                customer experience.
              </p>
              <p className="text-gray-600">
                We envision a world where everyone can discover their signature scent and 
                express their unique personality through the art of perfumery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Signature Scent?</h2>
          <p className="text-gray-700 text-lg mb-8">
            Explore our collection of inspired fragrances and discover the perfect scent that tells your story.
          </p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 hover:text-black transition-colors duration-200"
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;