import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Heart.module.css'
import { CardContext } from '../../Context/CardContext'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../assets/images1 (11).svg';
export default function Heart() {
    const { withes, setWithes } = useContext(CardContext);
    function isProductInWithes(productId) {
        return withes.some(product => product.id === productId);
    }
    return (
        <>{withes > 0 ? <div className='mt-2'>
            <div className="row">
                {withes.map((product, index) => (
                    <div key={index} className="inner rounded-md flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 flex p-5">

                        <div className='className="w-full relative card rounded-md    '>
                            <div className='absolute transition-all duration-300 icons   top-0 m-3   opacity-80 rounded-lg  p-4 w-10 h-30 bg-[#00000073]'>
                                <ul className=" list-unstyled h-full w-full flex flex-col items-center justify-center gap-3 text-white">
                                    <li className="cursor-pointer" tabIndex="0">
                                        <Link to={`/productDetails/${product.id}/${product.category.name}`} className="block">
                                            <i class="fa fa-search fs-6"></i>
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer" style={{
                                        color: isProductInWithes(product.id) ? 'red' : 'white'
                                    }} tabIndex="0">
                                        <i class="fa fa-heart fs-6"></i>
                                    </li>
                                    <li className="cursor-pointer" onClick={() => AddCard(product.id)} tabIndex="0">
                                        <i class="fa-solid fa-cart-plus fs-6"></i>
                                    </li>
                                </ul>
                            </div>
                            <img src={product.imageCover} className="w-full" alt={`${product.title} cover`} />
                        </div>
                        <div className="flex justify-between gap-1 items-center mt-2">
                            <span className="block font-semibold text-[15px]">
                                {product.category.name.split(" ").slice(0, 2).join(" ")}
                            </span>
                            <span className="block font-semibold text-[15px]">
                                {product.title.split(" ").slice(0, 2).join(" ")}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="block">{product.ratingsAverage} <i className="fa-solid text-yellow-300 fa-star"></i></span>
                            <span className="block  font-semibold">{product.price} EGY</span>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer position="bottom-right" />
        </div> : <img src={img} className='w-1/2' />}

        </>
    )
}
