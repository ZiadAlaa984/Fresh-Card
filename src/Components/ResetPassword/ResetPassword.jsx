import React, { useState } from 'react';
import login from '../../assets/login.svg';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const headers = {
        token: localStorage.getItem('tokinUser')
    };

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        password: Yup.string().required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const Update = async (formValues) => {
        try {
            const response = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
                formValues,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const handleUpdate = async (formValues) => {
        setLoading(true);
        try {
            const response = await Update(formValues);
            if (response.message === 'success') {
                toast.success('Password updated successfully');
            } else {
                toast.error('currentPassword is not correct');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            rePassword: ''
        },
        validationSchema,
        onSubmit: handleUpdate
    });

    return (
        <>
            <div className="shadow md:p-6 flex flex-col lg:flex-row justify-around gap-4 h-full w-full px-4 items-center">
                <form onSubmit={formik.handleSubmit} className="lg:w-1/2 w-full pb-3 md:pb-0 order-2 lg:gap-1 h-full flex flex-col lg:px-4 mx-auto">
                    <h1 className="font-bold mb-3 text-[rgb(59,183,126)] text-center lg:text-5xl text-3xl">Update Your Password</h1>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="currentPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currentPassword}
                            id="currentPassword"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer"
                            placeholder=" "
                        />
                        <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Current Password
                        </label>
                        {formik.touched.currentPassword && formik.errors.currentPassword && (
                            <div className="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{formik.errors.currentPassword}</span>
                            </div>
                        )}
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
                            New Password
                        </label>
                        {formik.touched.password && formik.errors.password && (
                            <div className="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{formik.errors.password}</span>
                            </div>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="rePassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rePassword}
                            id="rePassword"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3bb77e] focus:outline-none focus:ring-0 focus:border-[#3bb77e] peer"
                            placeholder=" "
                        />
                        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3bb77e] peer-focus:dark:text-[#3bb77e] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            New rePassword
                        </label>
                        {formik.touched.rePassword && formik.errors.rePassword && (
                            <div className="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{formik.errors.rePassword}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center items-center gap-7">
                        <button type="submit" className="text-white bg-[#3bb77e] hover:bg-[#3bb77e] font-medium rounded-lg text-sm px-5 py-2.5 m-0 dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]">
                            {loading ? <i className="fa fa-spin fa-spinner fs-6"></i> : 'Submit'}
                        </button>
                    </div>
                </form>
                <div className="lg:w-1/2 w-full lg:order-2 order-1">
                    <img src={login} className="w-full" alt="Login Illustration" />
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </>
    );
}
