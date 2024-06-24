import React, { useContext, useState } from 'react';
import login from '../../assets/login.svg';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext'
export default function Login() {
    let { Token, setToken, user, setUser } = useContext(UserContext);
    let [loading, setloading] = useState(false)
    let [apiResopone, setapiResopone] = useState()
    let navigator = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    async function handleLogin(formValues) {
        setloading(true);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
            .then(function (x) {
                localStorage.setItem('tokinUser', x.data.token)
                console.log(x);
                setUser(x.data.user)
                setToken(x.data.token)
                navigator('/');
                setloading(false);
            })
            .catch(
                (apiRes) => {
                    setapiResopone(apiRes?.response?.data?.message)
                    setloading(false);
                }
            )
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: handleLogin
    });


    return (
        <>
            <div className=" md:p-6 flex flex-col lg:flex-row justify-around gap-4 h-full w-full px-4 items-center">
                <form onSubmit={formik.handleSubmit} className="lg:w-1/2 w-full pb-3 md:pb-0 order-2 lg:gap-1 h-full flex flex-col lg:px-4 mx-auto">
                    <h1 className='font-bold mb-3 text-[rgb(59,183,126)] text-center lg:text-5xl text-3xl'>Login Now :</h1>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer"
                            placeholder=" "
                        />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter the Email
                        </label>
                        {formik.touched.email && formik.errors.email ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.email}</span></div> : null}


                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer"
                            placeholder=" "

                        />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter the password
                        </label>
                        {formik.touched.password && formik.errors.password ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.password}</span></div> : null}
                    </div>
                    <div className="flex justify-center items-center gap-7">
                        {apiResopone ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{apiResopone}</span></div> : null}
                        <button type="submit" className="text-white bg-[#3bb77e] hover:bg-[#3bb77e] font-medium rounded-lg text-sm px-5 py-2.5 m-0 dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]">
                            {loading ? <i _ngcontent-ng-c805839159="" className="fa fa-spin fa-spinner fs-6"></i> : 'Submit'}
                        </button>
                    </div>
                </form >
                <div className='lg:w-1/2 w-full lg:order-2 order-1'>
                    <img src={login} className='w-full' alt="Login Illustration" />
                </div>
            </div >
        </>
    );
}
