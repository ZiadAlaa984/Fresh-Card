import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../Context/CardContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
    const { addToCard, setCount, withLength, setWithLength, productInWithes, addToWithList, withes, removewishlist } = useContext(CardContext);
    const [productsInCart, setProductsInCart] = useState([]);
    const [productsWithGreenCartIcon, setProductsWithGreenCartIcon] = useState([]);
    const [productsInWishlist, setProductsInWishlist] = useState([]);

    useEffect(() => {
        async function fetchProductsInCart() {
            if (localStorage.getItem('tokinUser')) {
                try {
                    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart');
                    setProductsInCart(res.data.products.map(product => product.id));
                } catch (error) {
                    console.error('Failed to fetch products in cart', error);
                }
            }
        }

        fetchProductsInCart();
    }, []);

    async function handleCart(productId) {
        if (localStorage.getItem('tokinUser')) {
            try {
                const res = await addToCard(productId);
                console.log(res);
                if (res.status === "success") {
                    setCount(prevCount => {
                        const newCount = prevCount + 1;
                        localStorage.setItem('count', newCount);
                        return newCount;
                    });
                    setProductsInCart(prevProducts => [...prevProducts, productId]);
                    setProductsWithGreenCartIcon(prevProducts => [...prevProducts, productId]);
                    toast.success('Product added to cart');
                }
            } catch (error) {
                console.error('Error updating cart:', error);
                toast.error('Error updating cart');
            }
        } else {
            toast.info('Login first');
        }
    }

    async function handleWishlist(productId) {
        if (localStorage.getItem('tokinUser')) {
            if (isProductInWithes(productId)) {
                try {
                    const response = await removewishlist(productId);
                    console.log(response);
                    setProductsInWishlist(prevProducts => prevProducts.filter(id => id !== productId));
                    setWithLength(withLength - 1);
                    toast.success('Product removed from wishlist');
                } catch (error) {
                    console.error('Error removing from wishlist:', error);
                    toast.error('Error removing from wishlist');
                }
            } else {
                try {
                    const res = await addToWithList(productId);
                    console.log(res);
                    if (res.status === "success") {
                        setWithLength(withLength + 1);
                        setProductsInWishlist(prevProducts => [...prevProducts, productId]);
                        toast.success('Product added to wishlist');
                    }
                } catch (error) {
                    console.error('Error updating wishlist:', error);
                    toast.error('Error updating wishlist');
                }
            }
        } else {
            toast.info('Login first');
        }
    }

    function isProductInWithes(productId) {
        return productsInWishlist.includes(productId) || productInWithes.includes(productId);
    }

    async function getData() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    const { data, isLoading } = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getData,
        retryDelay: 1000,
        staleTime: Infinity
    });

    if (isLoading) {
        return (
            <div className='flex justify-center min-h-screen items-center w-full'>
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className='mt-2'>
            <div className="row">
                {data?.data.data.map((product, index) => (
                    <div key={index} className="inner rounded-md p-3 flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex">
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
                                        onClick={() => handleWishlist(product.id)}
                                        tabIndex="0"
                                        style={{
                                            color: isProductInWithes(product.id) ? 'red' : 'white'
                                        }}
                                    >
                                        <i className="fa fa-heart fs-6"></i>
                                    </li>
                                    <li
                                        className="cursor-pointer"
                                        onClick={() => handleCart(product.id)}
                                        tabIndex="0"
                                        style={{
                                            color: productsWithGreenCartIcon.includes(product.id) ? '#3bb77e' : 'white'
                                        }}
                                    >
                                        <i className="fa-solid fa-cart-plus fs-6"></i>
                                    </li>
                                </ul>
                            </div>
                            <img src={product.imageCover} className="w-full" alt={`${product.title} cover`} />
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <div className='flex items-center justify-between'>
                                <div className="flex justify-between w-full items-center">
                                    <span className="block text-[#3bb77e] font-normal text-[18px]">
                                        {product.category.name.split(" ").slice(0, 2).join(" ")}
                                    </span>
                                    <li
                                        className="cursor-pointer list-none"
                                        tabIndex="0"
                                        style={{
                                            color: productsWithGreenCartIcon.includes(product.id) ? '#3bb77e' : 'white'
                                        }}
                                    >
                                        <i className="fa-solid fa-cart-plus fs-6"></i>
                                    </li>
                                </div>
                            </div>
                            <div className='flex items-center justify-between w-full '>
                                <span className="block font-normal text-[16px]">
                                    {product.title.split(" ").slice(0, 2).join(" ")}
                                </span>
                                <li
                                    className="cursor-pointer list-none"
                                    tabIndex="0"
                                    style={{
                                        color: isProductInWithes(product.id) ? 'red' : 'white'
                                    }}
                                >
                                    <i className="fa fa-heart fs-6"></i>
                                </li>
                            </div>
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
