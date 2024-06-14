
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Brand.module.css'
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Brand() {
    async function getData() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    }
    let { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ['recentBrand'],
        queryFn: getData,
        retryDelay: 1000,
        staleTime: Infinity
    })

    if (isLoading) {
        return <div className='flex justify-center  h-screen items-center w-full'>
            <span className="loader"></span>
        </div>;
    }

    return (
        <div className='mt-2'>
            <div className="row">
                {data.data.data.map((Brand, index) =>
                    <div key={index} className="inner flex-col w-full md:w-1/2 lg:w-1/4  flex p-5">
                        <Link to={`/BrandDetails/${Brand._id}`} className="block">
                            <img src={Brand.image} className="w-full lg:h-[400px] h-[200px] object-contain" alt={`${Brand.name} cover`} />
                            <div className=" mt-2">
                                <h2 className="block text-xl text-center text-[#3bb77e]">
                                    {Brand.name}
                                </h2>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
