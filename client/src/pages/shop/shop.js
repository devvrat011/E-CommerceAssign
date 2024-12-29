import React from 'react';
import Navbar from '../../components/Navbar';
import Search from '../../components/AllProduct';
import Newsletter from '../../components/newsletter';
import Footer from '../../components/Footer';
import HomeCarousel from '../../components/homeCarousel';
const Shop = () => {
    
  return (
    <div className='bg-gray-100'>
        <Navbar/>
    <section className="bg-cover  bg-center h-[500px] flex justify-center items-center text-white" style={{ backgroundImage: "url('/path-to-image.jpg')" }}>
      <HomeCarousel/>
    </section>
    <Search/>
    <Newsletter/>
    <Footer/>
    </div>
  );
};

export default Shop;
