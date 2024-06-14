import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../Context/CardContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    const { addToCard, setCount, Count, withes, setWithes } = useContext(CardContext);
    console.log(withes);

    async function AddCard(productId) {
        if (localStorage.getItem('tokinUser')) {
            try {
                const res = await addToCard(productId);

                if (res.status === "success") {
                    setCount(prevCount => {

                        const newCount = prevCount + 1;
                        localStorage.setItem('count', newCount);
                        return newCount;
                    });
                    toast.success('Product added successfully');
                }
            } catch (error) {
                toast.error('Product not added');
            }
        } else {
            toast.info('Product removed from wishlist');
        }

    }


    function AddwithList(product, productId) {
        if (localStorage.getItem('tokinUser')) {
            if (isProductInWithes(productId)) {
                const updatedWithes = withes.filter(item => item.id !== productId);
                setWithes(updatedWithes);
                localStorage.setItem('withes', JSON.stringify(withes))
                toast.error('Product removed from wishlist');
            } else {
                setWithes(prevWithes => [...prevWithes, product]);
                toast.success('Product added to wishlist');
            }
        }
        else {
            toast.info('Product removed from wishlist');
        }

    }
    function isProductInWithes(productId) {
        return withes.some(product => product.id === productId);
    }

    async function getData() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let { data, error, isLoading, isError, isFetching } = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getData,
        retryDelay: 1000,
        staleTime: Infinity
    });

    if (isLoading) {
        return <div className='flex justify-center min-h-screen items-center w-full'>
            <span className="loader"></span>
        </div>;
    }

    return (
        <div className='mt-2'>
            <div className="row">
                {data?.data.data.map((product, index) => (
                    <div key={index} className="inner rounded-md p-3 flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex ">

                        <div className='w-full relative card rounded-md'>
                            <div className='absolute transition-all duration-300 icons top-0 m-3 opacity-80 rounded-lg p-4 w-10 h-30 bg-[#00000073]'>
                                <ul className="list-unstyled h-full w-full flex flex-col items-center justify-center gap-3 text-white">
                                    <li className="cursor-pointer" tabIndex="0">
                                        <Link to={`/productDetails/${product.id}/${product.category.name}`} className="block">
                                            <i className="fa fa-search fs-6"></i>
                                        </Link>
                                    </li>
                                    <li
                                        className="cursor-pointer"
                                        onClick={() => AddwithList(product, product.id)}
                                        tabIndex="0"
                                        style={{
                                            color: isProductInWithes(product.id) ? 'red' : 'white'
                                        }}
                                    >
                                        <i className="fa fa-heart fs-6"></i>
                                    </li>
                                    <li className="cursor-pointer" onClick={() => AddCard(product.id)} tabIndex="0">
                                        <i className="fa-solid fa-cart-plus fs-6"></i>
                                    </li>
                                </ul>
                            </div>
                            <img src={product.imageCover} className="w-full" alt={`${product.title} cover`} />
                        </div>
                        <div className="flex  flex-col gap-1  mt-2">
                            <span className="block text-[#3bb77e] font-normal text-[18px]">
                                {product.category.name.split(" ").slice(0, 2).join(" ")}
                            </span>
                            <span className="block font-normal text-[16px]">
                                {product.title.split(" ").slice(0, 2).join(" ")}
                            </span>
                        </div>
                        <div className="flex justify-between font-extralight text-[16px] items-center mt-1">
                            <span className="block ">{product.price} EGY</span>
                            <span className="block">{product.ratingsAverage} <i className="fa-solid text-yellow-300 fa-star"></i></span>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}
