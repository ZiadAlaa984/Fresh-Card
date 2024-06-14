import React from 'react'
import img1 from '../../assets/images1 (4).svg'
import img2 from '../../assets/images1 (5).svg'
import img3 from '../../assets/images1 (6).svg'
import img4 from '../../assets/images1 (7).svg'
import img5 from '../../assets/images1 (9).png'
import img6 from '../../assets/images1 (10).png'
export default function Footer() {
    return (
        <>
            <div className="footer bg-slate-50">
                <div className="footer  container max-w-[90%]  mx-auto p-4">
                    <h4 className='text-xl font-semibold'>Get The Fresh Cart app</h4>
                    <p className='text-xl opacity-75'>We will send you a link, Open it on your phone to download the app.</p>
                    <div>
                        <div className='flex flex-col md:flex-row mt-3 gap-5 md:gap-20'>
                            <input type="email" placeholder=' Email...' id="small-input" className="block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-[#3bb77e]  py-3 focus:border-[#3bb77e] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring- dark:focus:border-" />
                            <button type="button" className="focus:outline-none text-white bg-[#3bb77e] hover:bg-green-800  font-medium rounded-lg text-sm px-12  dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] text-nowrap py-3 dark:focus:ring-green-800">Share App Link</button>
                        </div>
                        <div className='mt-3 flex flex-col lg:flex-row justify-between items-center p-1  border-slate-300  border-[.5px]  border-x-0'>
                            <p className='text-xl  text-center flex-col flex justify-center items-center font-light  md:gap-0 md:flex-row '> <span>Payment Partners</span> <div className='flex flex-row items-center justify-around gap-2 '> <img src={img1} className='w-12' alt="" /><img src={img2} className='w-12' alt="" /><img src={img3} className='w-8' alt="" /><img src={img4} className='w-16' alt="" /></div></p>
                            <p className='text-xl flex-col md:flex-row text-center md:text-left  font-light flex   items-center gap-2'> Get Delivery With FreshCart <div className='flex flex-row items-center justify-around gap-2 md:gap-0 ' ><img src={img5} className='h-[35px]' alt="" /><img src={img6} className='h-[25px]' alt="" /></div></p>
                        </div>
                        <div className='mt-3 flex flex-col md:flex-row justify-between items-center p-1  '>
                            <p className='text-xl font-light flex flex-row  items-center gap-2'>Our Social Links</p>
                            <p className='text-xl font-light flex flex-row  items-center gap-2'><div _ngcontent-ng-c2698397363="" className="social-links"><a _ngcontent-ng-c2698397363="" className="cursor-pointer"><i _ngcontent-ng-c2698397363="" className="fab fa-instagram mx-2"></i></a><a _ngcontent-ng-c2698397363="" className="cursor-pointer"><i _ngcontent-ng-c2698397363="" className="fab fa-facebook mx-2"></i></a><a _ngcontent-ng-c2698397363="" className="cursor-pointer"><i _ngcontent-ng-c2698397363="" className="fab fa-tiktok mx-2"></i></a><a _ngcontent-ng-c2698397363="" className="cursor-pointer"><i _ngcontent-ng-c2698397363="" className="fab fa-twitter mx-2"></i></a><a _ngcontent-ng-c2698397363="" className="cursor-pointer"><i _ngcontent-ng-c2698397363="" className="fab fa-linkedin mx-2"></i></a><a _ngcontent-ng-c2698397363="" className="cursor-pointer"><i _ngcontent-ng-c2698397363="" className="fab fa-youtube mx-2"></i></a></div></p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
