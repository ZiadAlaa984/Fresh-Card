import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BrandDetails() {
    const { id } = useParams();
    const [detailsBrand, setDetailsBrand] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getDetailsBrand(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`); // Assuming the correct endpoint for brand details
            setDetailsBrand(data.data); // Assuming the brand details are inside data.data
            console.log("Brand Details:", data.data);
            setisLoading(false);
        } catch (error) {
            setError(error);
            setisLoading(false);
        }
    }

    useEffect(() => {
        setisLoading(true);
        getDetailsBrand(id);
    }, [id]);

    if (isLoading) {
        return <div className='flex justify-center min-h-screen items-center w-full'>
            <span className="loader"></span>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {detailsBrand ? (
                <div className='flex-col w-full m-auto'>
                    <div className='flex  justify-between flex-col md:flex-row  p-5'>
                        <div className="md:w-1/3 mb-3">
                            <img src={detailsBrand.image} className='w-full lg:h-[400px] h-[200px] object-contain' alt="Product" />
                        </div>
                        <div className='w-full md:flex md:items-center    md:w-2/3'>
                            <h1 className='text-3xl text-center md:text-left md:ms-6   font-extrabold  text-[#3bb77e]'>{detailsBrand.slug}</h1>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
