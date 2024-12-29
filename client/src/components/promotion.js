import React from 'react';
import PromotionImg from '../images/promotion_img.avif';
import { Link } from 'react-router-dom';

function Promotion() {
  return (
    <div className="bg-gray-50 flex flex-col md:flex-row items-center px-4 md:px-20 py-8">
      {/* Left Side: Image */}
      <div className="flex-1">
        <img
          src={PromotionImg}
          alt="Stylish room"
          className="rounded-lg shadow-lg w-full md:max-w-lg"
        />
      </div>

      {/* Right Side: Text */}
      <div className="flex-1 text-center md:text-left mt-8 md:mt-0 md:ml-12">
        <p className="text-blue-600 font-semibold text-sm md:text-base">
          SALE UP TO 35% OFF
        </p>
        <h1 className="text-3xl md:text-5xl font-bold my-4">
          HUNDREDS of <br />
          New lower prices!
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          It’s more affordable than ever to give every room in your home a stylish makeover.
        </p>
        <button className="text-blue-600 font-medium border-b-2 border-blue-600 hover:border-blue-800">
          <Link to={"/shop"}> Shop Now → </Link>
        </button>
      </div>
    </div>
  );
}

export default Promotion;
