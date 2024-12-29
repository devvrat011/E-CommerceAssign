import React from 'react';
import HomeCarousel from './homeCarousel';
import img1 from "../images/login_img2.jpeg";
import img2 from "../images/bedroom_img.jpeg";
import img3 from "../images/kitchen_img.jpeg";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <section
        className="bg-cover bg-center h-[400px] flex justify-center items-center text-white"
        style={{ backgroundImage: "url('/path-to-image.jpg')" }} // Replace with the path to your background image
      >
        <HomeCarousel/>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:px-28 md:py-20 bg-white">
          {/* Left Text Section */}
          <div className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <p>Simply Unique/</p>
            <p>Simply Better.</p>
          </div>
          {/* Right Text Section */}
          <div className="mt-6 md:mt-0 md:ml-8 text-gray-600 text-lg">
            <p>
              <span className="font-bold text-gray-900">3legant</span> is a gift & decorations store based in HCMC,
            </p>
            <p> Vietnam. Est since 2019.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-screen px-28">
          {/* Left Section - Living Room */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[70%]">
            <img
              src={img1} // Replace with the Living Room image URL
              alt="Living Room"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-8 left-8 text-black">
              <h2 className="text-3xl font-semibold">Living Room</h2>
              <Link to={"/shop"} className="text-gray-700 text-sm hover:text-black">
                  Shop Now →
              </Link>
            </div>
          </div>
          {/* Right Section - Bedroom and Kitchen */}
          <div className="grid grid-rows-2 gap-4 h-[70%]">
            {/* Bedroom */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={img2} // Replace with the Bedroom image URL
                alt="Bedroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 text-black">
                <h2 className="text-2xl font-semibold">Bedroom</h2>
                <Link to={"/shop"} className="text-gray-700 text-sm hover:text-black">
                  Shop Now →
                </Link>
              </div>
            </div>
            {/* Kitchen */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={img3} // Replace with the Kitchen image URL
                alt="Kitchen"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 text-black">
                <h2 className="text-2xl font-semibold">Kitchen</h2>
                <Link to={"/shop"} className="text-gray-700 text-sm hover:text-black">
                  Shop Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
