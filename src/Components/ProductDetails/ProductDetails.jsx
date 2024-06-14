import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CardContext } from '../../Context/CardContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
    const { addToCard, setCount, Count } = useContext(CardContext);

    async function AddProdCard(productId) {
        try {
            const res = await addToCard(productId);
            console.log(productId);
            console.log(res);
            setCount(Count + 1);
            if (res.status === "success") {
                toast.success('Product added successfully');
                localStorage.setItem('count', Count + 1);
            }
        } catch (error) {
            toast.error('Product not added');
        }
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const { id, category } = useParams();
    let [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    async function getDetails(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setDetails(data.data);
            setError(null); // Clear previous error state
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    async function getRelatedData(category) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            const filteredProducts = data.data.filter((product) => product.category.name === category);
            setProducts(filteredProducts);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        getDetails(id);
        getRelatedData(category);
    }, [id, category]);

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
            {details && (
                <div className='flex-col w-[90%] m-auto'>
                    <div className='flex gap-3 flex-col md:flex-row p-5'>
                        <div className="md:w-1/3 mb-3">
                            <Slider {...settings}>
                                {details?.images.map((src, index) => <img src={src} key={index} className='w-full' alt={`Product image ${index + 1}`} />)}
                            </Slider>
                        </div>
                        <div className='w-full md:w-2/3'>
                            <div className="w-full flex gap-4 flex-col justify-center h-full">
                                <h1 className='text-3xl text-[#3bb77e]'>{details.title}</h1>
                                <p className='text-xl text-slate-800'>{details.description}</p>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl text-[#3bb77e]'>Category: {details.category.name}</p>
                                    <p><i className="fa-regular fa-heart"></i></p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-slate-600'>Price: {details.price} EGY</p>
                                    <p className='font-light'><i className='fa fa-star text-yellow-300'></i> {details.ratingsAverage}</p>
                                </div>
                                <button
                                    type="button"
                                    className="text-white bg-[#3bb77e] hover:bg-[#3bb77e] font-medium rounded-md text-sm px-5 py-2.5 m-0 dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]"
                                    onClick={() => AddProdCard(details.id)}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer position="bottom-right" />
                    <div className="row flex flex-row flex-wrap items-center">
                        {products.map((product) => (
                            <div key={product.id} className="inner flex-col w-full md:w-1/2 lg:w-1/4 xl:w-1/6 flex p-5">
                                <Link to={`/productDetails/${product.id}/${product.category.name}`} className="block">
                                    <img src={product.imageCover} className="w-full" alt={`${product.title} cover`} />
                                    <div className="flex justify-between gap-1 items-center mt-2">
                                        <span className="block text-[12px]">
                                            {product.category.name.split(" ").slice(0, 2).join(" ")}
                                        </span>
                                        <span className="block text-[12px]">
                                            {product.title.split(" ").slice(0, 2).join(" ")}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="block">{product.ratingsAverage}</span>
                                        <span className="block">{product.price} EGY</span>
                                    </div>
                                    <div className="mx-auto mt-2">
                                        <button

                                            type="button"
                                            className="text-white bg-[#3bb77e] hover:bg-[#3bb77e] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e]"
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </>
    );
}
