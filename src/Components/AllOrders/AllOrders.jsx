import React from 'react';
import img from '../../assets/images1 (9).svg';

export default function AllOrders() {
    return (
        <div className="w-[90%] h-full mx-auto justify-center flex items-center bg-white">
            <div className='w-full justify-center flex items-center mx-auto'>
                <img src={img} className='lg:w-1/2 w-full  object-contain' alt="Not Found" />
            </div>
        </div>
    );
}
