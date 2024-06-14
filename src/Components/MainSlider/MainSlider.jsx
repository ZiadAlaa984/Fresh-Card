import React from 'react'
import img1 from '../../assets/slider_main/img1.jpg'
import img2 from '../../assets/slider_main/images2.jpg'
import img3 from '../../assets/slider_main/images3.jpg'
import img4 from '../../assets/slider_main/images4.jpg'
import img5 from '../../assets/slider_main/images5.jpg'
import Slider from "react-slick";
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
    };
    return (
        <div className='max-w-full  mx-auto'>
            <div className='flex flex-row  '>
                <div className='w-3/4'>
                    <Slider {...settings}>
                        <img className='w-full object-cover max-h-[600px]' src={img1} alt="image1" />
                        <img className='w-full object-cover max-h-[600px]' src={img2} alt="image2" />
                        <img className='w-full object-cover max-h-[600px]' src={img3} alt="image3" />
                    </Slider>
                </div>
                <div className='w-1/4 '>
                    <img className='w-full h-[50%] object-cover lg:max-h-[300px]' src={img4} alt="image4" />
                    <img className='w-full h-[50%] object-cover lg:max-h-[300px]' src={img5} alt="image5" />
                </div>
            </div>
        </div>
    )
}
