import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { UserContext } from "../../Context/UserContext";

import * as Yup from 'yup';
export default function Register() {
    let { Token, setToken, user, setUser } = useContext(UserContext);
    let [apiResopone, setapiResopone] = useState()
    let [loading, setloading] = useState(false);
    let navigator = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'min length is 3').max(15, 'max length is 15').required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        password: Yup.string().required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm rePassword is required'),
    });
    async function handelRegister(formValues) {
        setloading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
            .then(function (x) {
                console.log(x);
                navigator('/');
                setUser(x.data.user)
                setloading(false);
                localStorage.setItem('tokinUser', x.data.token);
                setToken(x.data.token);

            })
            .catch(
                (apiRes) => {
                    setapiResopone(apiRes?.response?.data?.message)
                    setloading(false);
                }
            )


    }
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit: handelRegister
    })
    return (
        <>
            <div className='max-w-xl lg:max-w-3xl  w-full'>
                <form className=" mx-auto" onSubmit={formik.handleSubmit}>
                    <h1 className='text-5xl mb-4 font-bold  text-center text-[#3bb77e]'>Register</h1>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer" placeholder=" " />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Name</label>
                        {formik.touched.name && formik.errors.name ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.name}</span></div> : null}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer" placeholder=" " />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        {formik.touched.email && formik.errors.email ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.email}</span></div> : null}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="tel" name="phone" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer" placeholder=" " />
                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone</label>
                        {formik.touched.phone && formik.errors.phone ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.phone}</span></div> : null}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer" placeholder=" " />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                        {formik.touched.password && formik.errors.password ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.password}</span></div> : null}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="Password" name="rePassword" id="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer" placeholder=" " />
                        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
                        {formik.touched.rePassword && formik.errors.rePassword ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{formik.errors.rePassword}</span></div> : null}
                    </div>

                    <div className='flex flex-row gap-4 items-center '>
                        <button type="submit" className="text-white transition-colors duration-300 bg-[#228054] hover:bg-[#3bb77e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]">{loading ? <i _ngcontent-ng-c805839159="" className="fa fa-spin fa-spinner fs-6"></i> : 'Submit'}</button>
                        {apiResopone ? <div class="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">{apiResopone}</span></div> : null}
                    </div>
                </form>
            </div>



        </>
    )
}
