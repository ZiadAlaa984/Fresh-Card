import { useEffect, useState, useContext } from 'react';
import style from './Card.module.css';
import { CardContext } from '../../Context/CardContext';
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images1 (10).svg';

export default function Card() {
    let [cardDetails, setCardDetails] = useState(null);
    let { getCard, UpdateCard, removeCard, setCount, Count } = useContext(CardContext);
    const [total, setTotal] = useState(0);
    async function getDataCard() {
        try {

            let response = await getCard();
            console.log(response);
            setCardDetails(response);
            setTotal(response.data.totalCartPrice)
            setCount(response.data.products.length)
            // console.log(response.data); // Add logging to debug
        } catch (error) {
            console.error("Error fetching card details:", error);
        }
    }

    async function removeDataCard(productId) {
        try {
            let response = await removeCard(productId);
            console.log(response);
            setCardDetails(response);
            setTotal(response.data.totalCartPrice);
            const newCount = response.data.products.length;
            setCount(newCount);
            localStorage.setItem('count', newCount);
        } catch (error) {
            console.error("Error removing card:", error);
        }
    }

    async function UpdateDataCard(productId, count) {
        if (count < 1) {
            return removeDataCard(productId);
        }
        try {
            let response = await UpdateCard(productId, count);
            setTotal(response.data.totalCartPrice);
            const newCount = response.data.products.length;
            setCount(newCount);
            localStorage.setItem('count', newCount);
            setCardDetails(response);
        } catch (error) {
            console.error("Error updating card:", error);
        }
    }

    useEffect(() => {
        getDataCard();
    }, []);


    if (!cardDetails) {
        return <div className='flex justify-center min-h-screen items-center w-full'>
            <span className="loader"></span>
        </div>; // Show a loading message while fetching data
    }
    return (
        <>


            {total > 0 ? <div className='flex flex-col container mx-auto items-start gap-9'>
                <div className='flex flex-col md:flex-row w-full justify-between items-center'>
                    <p className=' font-light'>
                        Number of cart items: <span className='opacity-70'>{Count}</span>
                    </p>
                    <p className=' font-light'>
                        Total price: <span className='opacity-70'>{total}</span> EGP
                    </p>
                </div>

                <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="text-center">
                                    Product
                                </th>
                                <th scope="col" className="text-center">
                                    Qty
                                </th>
                                <th scope="col" className="text-center">
                                    Price
                                </th>
                                <th scope="col" className="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardDetails?.data?.products.map((product) => (
                                <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                    </td>
                                    <td className="text-center p-3 font-normal text-[18px] text-gray-900 dark:text-white">
                                        {product.product.title}
                                    </td>
                                    <td className="text-center p-3">
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => UpdateDataCard(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                <span className="sr-only">Decrease quantity</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <div>
                                                <span>{product.count}</span>
                                            </div>
                                            <button onClick={() => UpdateDataCard(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                <span className="sr-only">Increase quantity</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center p-3 font-extralight text-[16px] text-gray-900 dark:text-white">
                                        {product.price} EGP
                                    </td>
                                    <td className="text-center p-3">
                                        <button onClick={() => removeDataCard(product.product.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-end items-center'>
                    <Link to='/Checkout' type="button" className="focus:outline-none text-white bg-[#3bb77e]  font-medium rounded-lg  px-12  dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] text-nowrap text-md py-3 dark:focus:ring-green-800">Online Payment</Link>
                </div>

            </div> : <img src={img} className='w-1/2' />}
        </>
    )
}
