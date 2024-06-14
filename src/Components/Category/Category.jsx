import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Category() {
    async function getData() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ['recentCategory'],
        queryFn: getData,
        retryDelay: 1000,
        staleTime: Infinity
    })
    console.log(data);

    if (isLoading) {
        return <div className='flex justify-center h-screen items-center w-full'>
            <span className="loader"></span>
        </div>;
    }

    return (
        <div className=''>
            <div className="row ">
                {data.data.data.map((category, index) =>
                    <div key={index} className="inner m-0 flex-col md:w-1/2 lg:w-1/4 w-full  flex p-5">
                        <Link to={`/CategoryDetails/${category._id}`} className="block">
                            <img src={category.image} className="w-full  h-[400px]  object-cover" alt={`${category.name} cover`} />
                            <div className=" mx-auto ">
                                <h2 className="block w-full mt-5 text-2xl text-center font-bold text-[#3bb77e]">
                                    {category.name}
                                </h2>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
