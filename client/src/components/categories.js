
import React from 'react';

const Category = ({ image, title }) => {
  return (
    <div className="category-card text-center">
      <img src={image} alt={title} className="mx-auto mb-4 h-40 w-auto rounded-xl" />
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
};

export default Category;
