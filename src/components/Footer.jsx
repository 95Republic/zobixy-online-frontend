import React, { useEffect } from 'react';
import { FaFacebookF, FaHeart, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaCartShopping, FaXTwitter } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_cart_products, get_wishlist_products } from '../store/reducers/cartReducer';

const Footer = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {cart_product_count, wishlist_count} = useSelector(state => state.cart)

    const redirect_to_cart_page = () => {
        if (userInfo) {
            navigate('/cart')
            
        } else {
            navigate('/login')
            
        }
    }


    useEffect(() => {
        if (userInfo) {
            dispatch(get_cart_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }
    },[userInfo])


    return (
        <footer className='bg-[#f3f6fa]'>
        <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6'>
            <div className='w-3/12 lg:w-4/12 sm:w-full'>
                <div className='flex flex-col gap-3'>
                    <img className='w-[190px] h-[70px]' src="http://localhost:3000/images/logo.png" alt="logo" />
                    <ul className='flex flex-col gap-2 text-slate-600'>
                        <li>Address :  2504 Blandford Manor Avenue, Northriding Randburg, Jozi 21053,</li>
                        <li>Phone : 0825826242</li>
                        <li>Email : support@zobixy.com</li>
                    </ul> 
                </div> 
            </div>

            <div className='w-5/12 lg:w-8/12 sm:w-full'>
                <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                    <div>
            <h2 className='font-bold text-lg mb-2'>Usefull Links </h2>
            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                    <li>
                        <Link>About Us </Link>
                    </li>
                    <li>
                        <Link>About Our Shop </Link>
                    </li>
                    <li>
                        <Link>Delivery Information </Link>
                    </li>
                    <li>
                        <Link>Privacy Policy </Link>
                    </li>
                    <li>
                        <Link>Blogs  </Link>
                    </li>
                </ul>

                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                    <li>
                        <Link>Our Service </Link>
                    </li>
                    <li>
                        <Link>Company Profile</Link>
                    </li>
                    <li>
                        <Link>Delivery Information </Link>
                    </li>
                    <li>
                        <Link>Privacy Policy </Link>
                    </li>
                    <li>
                        <Link>Blogs  </Link>
                    </li>
                </ul>

            </div>
                    </div> 
                </div> 
            </div>

{/* Join our shop section */}
        <div className='w-4/12 lg:w-full lg:mt-6'>
            <div className='w-full flex flex-col justify-start gap-5'>
                <h2 className='font-bold text-lg mb-2'>Join Our Shop</h2>
                <span>Get Email updates about our latest and shop specials offers</span>
                <div className='h-[50px] w-full bg-white border relative'>
                    <input className='h-full bg-transparent w-full px-3 outline-0' type="text" placeholder='Enter Your Email' />
                    <button className='h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm'>Subscribe</button>  
                 </div> 
                 <ul className='flex justify-start items-center gap-3'>
                    <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaFacebookF/> </a>
                    </li>

                    <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaXTwitter/> </a>
                    </li>
                    <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaInstagram/> </a>
                    </li>
                    <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaTiktok/> </a>
                    </li>

                 </ul>
            </div> 
        </div> 



        </div>

        <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center'>
            <span>Copyright @ 2025 All Rights Reserved </span>
        </div>


<div className='hidden fixed md-lg:block w-[50px] h-[110px] bottom-3 right-2 bg-white rounded-full p-2'>
    <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
    <div onClick={redirect_to_cart_page}  className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
        <span className='text-xl text-green-500'><FaCartShopping/></span>
        {
            cart_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                {
                    cart_product_count
                }
            </div>
        }
        
        
    </div>

    <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
        <span className='text-xl text-green-500'><FaHeart/></span>
        {
            wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                {
                   wishlist_count 
                }
            </div>
        }
        
    </div>

    </div>
</div>




       
    </footer>
    );
};

export default Footer;