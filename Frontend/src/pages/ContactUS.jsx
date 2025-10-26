import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactUS = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">CONTACT US</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label 
            htmlFor="email" 
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-200"
        >
          Send
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          This site is protected by reCaptcha and the reCaptcha Privacy Policy and Terms of Service apply.
        </p>
      </form>

      {/* WhatsApp floating button */}
      <a 
        href="https://wa.me/+923129167292" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </div>
  );
};

export default ContactUS;