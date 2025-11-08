import React from "react";
import { FaTruck, FaShieldAlt, FaThumbsUp } from "react-icons/fa";

const PolicyFeatures = () => {
  const features = [
    {
      icon: <FaTruck className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4" />,
      title: "FAST AND RELIABLE SHIPPING",
      description: "Enjoy quick and dependable delivery on all orders, ensuring your products arrive on time, every time.",
    },
    {
      icon: <FaShieldAlt className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4" />,
      title: "15 DAYS EASY RETURNS POLICY",
      description: "Didn't Love What You Ordered? Avail returns or exchange for your online purchases within 15 days. For in-store exchanges only.",
    },
    {
      icon: <FaThumbsUp className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4" />,
      title: "HIGH CONCENTRATION PERFUMES",
      description: "We Set Our Concentrations As High As Possible To Ensure Maximum Performance Of The Perfumes",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white my-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] text-center p-6 bg-white transition-all duration-300"
              aria-labelledby={`feature-title-${index}`}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3
                id={`feature-title-${index}`}
                className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 uppercase tracking-wide font-sans"
              >
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive and Custom Styles */}
      <style jsx>{`
        .container {
          max-width: 1280px;
        }
        .grid {
          display: grid;
          place-items: center;
        }
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .max-w-[300px] {
            max-width: 280px;
          }
          .text-3xl {
            font-size: 1.875rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .p-6 {
            padding: 1rem;
          }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .max-w-[340px] {
            max-width: 320px;
          }
          .text-4xl {
            font-size: 2.25rem;
          }
          .text-xl {
            font-size: 1.25rem;
          }
          .text-base {
            font-size: 0.9375rem;
          }
        }
        @media (min-width: 1024px) {
          .max-w-[380px] {
            max-width: 360px;
          }
          .text-5xl {
            font-size: 3rem;
          }
          .text-2xl {
            font-size: 1.5rem;
          }
          .text-base {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PolicyFeatures;