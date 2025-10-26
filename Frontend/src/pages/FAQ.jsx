import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How do I apply Roll-ons/Attars?",
      answer: "Apply the roll-on/attar to pulse points such as wrists, neck, and behind ears. The warmth of these areas helps diffuse the fragrance throughout the day."
    },
    {
      question: "Do you have any outlet?",
      answer: "Yes, you can visit our physical store at [Your Store Address]. For more details, please contact our customer service."
    },
    {
      question: "Are these original?",
      answer: "Yes, we guarantee 100% authenticity of all our products. We source directly from authorized manufacturers and distributors."
    },
    {
      question: "Are you selling the real products?",
      answer: "Absolutely! We only deal in genuine products and provide authenticity guarantee with all our items."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 15-day hassle-free return policy. Products must be unused and in original packaging with all tags intact."
    },
    {
      question: "Why would we buy from you and not from others?",
      answer: "We offer authentic products, competitive prices, excellent customer service, and a hassle-free return policy."
    },
    {
      question: "How long does it last?",
      answer: "The longevity varies by product, but most of our fragrances last 6-8 hours on average. Premium attars can last even longer."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2">FAQ</h1>
      <h2 className="text-xl text-gray-600 text-center mb-8">FREQUENTLY ASKED QUESTIONS</h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full flex justify-between items-center py-4 px-4 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-lg font-medium text-left">{item.question}</span>
              <span className="text-2xl font-light">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-48' : 'max-h-0'
              }`}
            >
              <p className="p-4 bg-gray-50 text-gray-600">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
