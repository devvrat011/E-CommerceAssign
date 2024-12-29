import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productFetchStart, productFetchSuccess, productFetchFailure } from '../redux/product/productSlice.js';
import Card from './card.js';
import { Button } from 'flowbite-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
const NewArrivals = () => {
    const dispatch = useDispatch();
    const { loading, products, error: errorMessage } = useSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const {currentUser}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          dispatch(productFetchStart());
          const res = await fetch('http://localhost:8000/api/products');
          const data = await res.json();
          if (res.ok) {
            dispatch(productFetchSuccess(data.products));
          }
        } catch (error) {
          dispatch(productFetchFailure(error.message));
          console.log(error.message);
        }
      };
  
      fetchProducts();
    }, [dispatch]);
  return (
    <section className="py-16 bg-white">
         {currentUser?.isAdmin ?
      <Button  gradientDuoTone='pinkToOrange' className="m-2" onClick={()=>navigate('/addProduct')}>
        Add Product
      </Button>:""}
      <h2 className="text-center text-3xl font-bold mb-8">New Arrivals</h2>
      <div className="max-w-7xl px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {loading && (
          <div className="text-center flex flex-col justify-center h-full mx-auto">
            <Spinner size='xl' />
            <span className='pl-3'>Loading...</span>
          </div>
        )}
        {!loading && products?.length === 0 && (
          <p className='text-xl text-gray-500'>No Products found.</p>
        )}
       
        {products?.slice(0, 4).map((card) => (
          <Card key={card.id} card={card} /> // Assuming each card has a unique 'id'
        ))}
      </div>
      {errorMessage && (
        <p className='text-red-500'>{errorMessage}</p>
      )}
     
      <button
                // onClick={navigate('/shop')}
                onClick={()=>navigate('/shop')}
                className='text-teal-500 text-lg hover:underline my-4 w-full'
              >
                Show More
              </button>
    </section>
  );
};

export default NewArrivals;
