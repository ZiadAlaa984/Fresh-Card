import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const [Category, setCategory] = useState([]);
    async function getCategory() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories'); // Log the data returned from the API
            setCategory(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error); // Improved error logging
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className='mb-6'>
            <h1 className=' lg:text-3xl text-2xl opacity-80 my-8'>Shop popular categories</h1>
            <Slider {...settings}>
                {Category.map((category) => (
                    <div className='flex flex-col' key={category._id}>
                        <img src={category.image} className='w-full   h-[300px] object-cover' alt={category.name} />
                        <h5 className='text-[12px] mb-3 font-light opacity-70 p-4 text-xl '>{category.name}</h5>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
