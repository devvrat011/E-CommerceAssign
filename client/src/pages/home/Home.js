import { useState } from "react";
import React from "react";
import AddProduct from "../../components/addProduct.js";
import Footer from '../../components/Footer.js';
import Navbar from '../../components/Navbar.js';
import { useSelector } from "react-redux";
import Search from "../../components/AllProduct.js";
import HomeCarousel from "../../components/homeCarousel.js";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header.js";
import Hero from "../../components/hero.js";
import NewArrivals from "../../components/newArrivals.js";
import Newsletter from "../../components/newsletter.js";
import Promotion from "../../components/promotion.js";
import Services from "../../components/services.js";
// import Categories from "../../components/categories.js";

const Home = () => {
  
  return (
    <div className="bg-white">
      {/* <Promotion/> */}
      <Navbar/>
      <Hero/>
      <NewArrivals/>
      <Services/>
      <Promotion/>
      <Newsletter/>
      <Footer/>
     
    </div>



  )

}

export default Home

