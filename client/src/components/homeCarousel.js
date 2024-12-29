import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./homeCarousel.css"; // import the carousel styles
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";

// Landing Page carousel
const HomeCarousel = () => {
    return (
            <div className='h-full '>
                <Carousel 
                    autoPlay 
                    infiniteLoop 
                    showThumbs={false} 
                    showStatus={false} 
                    dynamicHeight={false}
                    interval={3000}
                >
                    <div className='w-full h-[100%]'> 
                        <img src={img1} alt="Image 1" className='w-full h-[59%] object-fill scale-120' />
                    </div>
                    <div className='w-full h-[100%]'> 
                        <img src={img2} alt="Image 2" className='w-full h-[59%] object-fill scale-120' />
                    </div>
                    <div className='w-full h-[100%]'> 
                        <img src={img3} alt="Image 3" className='w-full h-[59%] object-fill scale-120' />
                    </div>
                </Carousel>
            </div>
    );
};

export default HomeCarousel;
