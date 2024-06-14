import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function CategoryDetails() {

    const { id } = useParams();  // Make sure the parameter name is 'category'
    let [detailsCatogory, setDetailsCatogory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getDetailsCatogory(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
            setDetailsCatogory(data.data); // Assuming the product details are inside data.data
            console.log("Product Details:", data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true); // Ensure loading state is set to true when fetching new data
        getDetailsCatogory(id);
    }, [id]);

    if (loading) {
        return <div className='flex justify-center  h-screen items-center w-full'>
            <span className="loader"></span>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {detailsCatogory && (
                <div className='flex-col w-full m-auto'>
                    <div className='flex  justify-between flex-col md:flex-row  p-5'>
                        <div className="md:w-1/3 mb-3">
                            <img src={detailsCatogory.image} className='w-full' alt="Product" />
                        </div>
                        <div className='w-full text-center flex  items-center md:w-2/3'>
                            <h1 className='text-xl lg:text-3xl font-extrabold ms-5 text-[#3bb77e]'>{detailsCatogory.name}</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
