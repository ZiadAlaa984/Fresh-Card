import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'

export default function Home() {
    return (
        <div className='flex flex-col w-full '>
            <MainSlider />
            <CategorySlider />
            <Products />
        </div>
    )
}
