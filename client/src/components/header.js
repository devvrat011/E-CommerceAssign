import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-100">
      <div className="text-2xl font-bold">Shopart</div>
      <nav>
        <ul className="flex space-x-6">
          <li className="hover:text-gray-700">Home</li>
          <li className="hover:text-gray-700">Products</li>
          <li className="hover:text-gray-700">Contact</li>
          <li className="hover:text-gray-700">Cart</li>
        </ul>
      </nav>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
