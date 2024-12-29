import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
      />
      <button className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md">Subscribe</button>
    </section>
  );
};

export default Newsletter;
