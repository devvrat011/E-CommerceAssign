import React from 'react';
import { FaShippingFast, FaMoneyBillWave, FaLock, FaHeadset } from 'react-icons/fa'; 

const Services = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
        <div className="service flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow">
          <FaShippingFast className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold">Free Shipping</h3>
        </div>
        <div className="service flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow">
          <FaMoneyBillWave className="text-4xl text-green-500 mb-4" />
          <h3 className="text-xl font-semibold">Money-Back Guarantee</h3>
        </div>

        <div className="service flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow">
          <FaLock className="text-4xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Secure Payments</h3>
        </div>

        <div className="service flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow">
          <FaHeadset className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold">24/7 Support</h3>
        </div>
      </div>
    </section>
  );
};

export default Services;
