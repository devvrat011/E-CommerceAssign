import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">3legant.</h1>
          <span className="text-gray-400 text-sm">Gift & Decoration Store</span>
        </div>
        {/* Center Section */}
        <div className="flex space-x-8 mt-4 md:mt-0 text-sm">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/shop" className="hover:text-gray-300">Shop</Link>
          <Link to="/product" className="hover:text-gray-300">Product</Link>
          <Link to="/blog" className="hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6"></div>
      {/* Bottom Section */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-400">
        <span>Copyright © 2024 3legant. All rights reserved</span>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300">Terms of Use</Link>
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <InstagramIcon className="hover:text-gray-300" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FacebookIcon className="hover:text-gray-300" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <YouTubeIcon className="hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
