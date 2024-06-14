import style from './Notfound.module.css'
import React from 'react'
import imgFound from '../../assets/images1 (4).jpg'
export default function Notfound() {
    return (
        <div className="w-[90%] h-full mx-auto justify-center flex items-center bg-white">
            <div className='w-full justify-center flex items-center  mx-auto'>
                <img src={imgFound} className='w-3/4 lg:w-1/2  object-contain' alt="" />
            </div>
        </div>
    )
}
