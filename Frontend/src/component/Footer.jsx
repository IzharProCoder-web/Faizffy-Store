import React from "react";
import { assets, footerLinks } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"; // Updated import

const Footer = () => {
  return (
    <footer className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8 bg-gradient-to-t from-gray-100 to-white shadow-inner">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-start justify-between pb-8 border-b border-gray-200">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <NavLink to="/" className="flex items-center space-x-3">
              <img
                className="w-12 h-12 object-contain"
                src={assets.logo}
                alt="FAIZZIFY Logo"
              />
              <p className="font-bold text-3xl text-gray-900 tracking-tight">
                FAIZZIFY
              </p>
            </NavLink>
            <p className="mt-4 max-w-xs text-gray-600 text-base leading-relaxed">
              Discover luxurious perfumes and fragrances delivered to your door.
              Trusted by thousands for an effortless and premium shopping experience.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://tiktok.com" // Updated link
                aria-label="TikTok" // Updated aria-label
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          {/* Links Section */}
          <div className="flex flex-wrap justify-between w-full md:w-2/3 gap-8">
            {footerLinks.map((section, index) => (
              <div key={index} className="min-w-[120px]">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Copyright */}
        <p className="py-6 text-center text-sm text-gray-500">
          Copyright {new Date().getFullYear()} © SprakDigital.dev All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;