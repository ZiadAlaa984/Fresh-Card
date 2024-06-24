import React, { useContext, useState } from "react";
import logo from '../../assets/logo.svg';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CardContext } from "../../Context/CardContext";

export default function Navbar() {
    let { Count, withLength } = useContext(CardContext);
    let navigate = useNavigate();
    let { Token, setToken } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function Logout() {
        setToken(null);
        localStorage.removeItem('tokinUser');
        navigate('/login');
    }

    return (
        <nav className="bg-slate-50 w-full border-gray-200 dark:bg-gray-900">
            <div className="max-w-[90%] mx-auto flex  gap-3 flex-wrap justify-center  items-center md:justify-between p-4">
                <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Logo" />
                </Link>

                <div className="flex md:order-2 md:mx-auto xl:mx-0 justify-center items-center  md:space-x-0 rtl:space-x-reverse">
                    {Token ? (
                        <ul className="flex me-3 items-center">
                            <li className="text-xl relative xl:p-2 p-1">
                                <Link to='Card'>
                                    <i className="fa-solid fa-cart-shopping fs-5 cursor-pointer px-2" tabIndex="0"></i>
                                    <p className="bg-[#3bb77e] flex justify-center items-center absolute w-[18px] h-[18px] top-0 right-1 p-2 font-bold text-white rounded text-[12px]">{Count}</p>
                                </Link>
                            </li>
                            <li className="text-xl relative xl:p-2 p-1">
                                <Link to='Heart'>
                                    <i className="fa-regular fa-heart fs-5 cursor-pointer px-2" tabIndex="0"></i>
                                    <p className="bg-[#3bb77e] flex justify-center items-center absolute w-[18px] h-[18px] top-0 right-1 p-1 font-bold text-white rounded text-[12px]">{withLength}</p>
                                </Link>
                            </li>
                            <li className="text-xl xl:p-2 p-1">
                                <Link to='YourInfo'>
                                    <i className="fa-regular fa-circle-user fs-5 cursor-pointer px-2"></i>
                                </Link>
                            </li>
                            <span onClick={Logout}
                                className="justify-center items-center cursor-pointer flex flex-row text-[18px] md:text-xl text-gray-900 transition-all duration-300 md:hover:bg-transparent md:hover:text-[#3bb77e] md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                LogOut<i className="fa-solid ps-2 fa-right-from-bracket"></i>
                            </span>
                        </ul>
                    ) : (
                        <ul className="flex justify-between mt-4 md:mt-0 gap-5 items-center">
                            <Link to='Register'
                                className="block ps-2 text-xl text-gray-900 transition-all duration-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#3bb77e] md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Register
                            </Link>
                            <Link to='Login'
                                className="block ps-2 text-xl text-gray-900 transition-all duration-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#3bb77e] md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Login
                            </Link>
                        </ul>
                    )}

                    {Token && (
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-cta"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className={`items-center justify-between ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
                    id="navbar-cta"
                >
                    <ul className="flex font-light w-full flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50  rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {Token && (
                            <>
                                <li className="text-xl">
                                    <NavLink
                                        to="Products"
                                        className="block transition-all duration-300 text-gray-900 rounded px-4 py-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li className="text-xl">
                                    <NavLink
                                        to="Category"
                                        className="block transition-all duration-300 text-gray-900 rounded px-4 py-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Category
                                    </NavLink>
                                </li>
                                <li className="text-xl">
                                    <NavLink
                                        to="Brand"
                                        className="block transition-all duration-300 text-gray-900 rounded px-4 py-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Brands
                                    </NavLink>
                                </li>
                                <li className="text-xl">
                                    <NavLink
                                        to="allorders"
                                        className="block text-nowrap transition-all duration-300 text-gray-900 rounded px-4 py-2 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        All Orders
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
