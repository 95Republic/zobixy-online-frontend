import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import error from '../assets/error.png';
import success from '../assets/success.png';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const ConfirmOrder = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const paymentStatus = queryParams.get('paymentSatus');

    const [loader, setLoader] = useState(true)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        switch (paymentStatus) {
            case 'payment_success':
                setMessage('succeeded');
                break;
            case 'processing':
                setMessage('processing');
                break;
            case 'requires_payment_method':
                setMessage('failed');
                break;
            default:
                setMessage('failed');
        }
    }, [paymentStatus]);

    
    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if(orderId){
            try {
                await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if(message === 'succeeded'){
            update_payment()
        }
    },[message])
    console.log(message)
    console.log(loader)

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                (message === 'failed' || message === 'processing') ? <>
                <img src={error} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard</Link>
                </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
                <img src={success} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard</Link>
                </>: <FadeLoader/>
            }
            
        </div>
    );
};

export default ConfirmOrder;