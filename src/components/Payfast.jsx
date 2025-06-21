import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
const Payfast = ({orderId, price}) => {

    const [loader, setLoader] = useState(false)
    const appearance = {
        theme: 'payfast'
    }
    const options = {
        appearance
    }

    useEffect(() => {
        if (orderId) {
            localStorage.setItem('orderId', orderId);
        }
    }, [orderId]);


const create_payment = async () => {
    setLoader(true)
    try {
        const response = await fetch('http://localhost:5000/api/payfast/order/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId, price })
        });

        const data = await response.json();
        if (data.paymentUrl) {
            window.location.href = data.paymentUrl; // Redirect to Payfast
        } else {
            alert('Failed to initiate Payfast payment');
            setLoader(false);
        }
    } catch (error) {
        console.error('Payment initiation error:', error);
        alert('Something went wrong');
        setLoader(false);
    }
    };

    return (
        // <div className='mt-4'>
        //     <button onClick={create_payment}
        //         className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
        //         Start Payment
        //     </button>
        // </div>
        <div className='mt-4'>
        {
            loader ? (
                <FadeLoader color="#10B981" />
            ) : (
                <button onClick={create_payment}
                    className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
                    Start Payment
                </button>
            )
        }
    </div>
    );
};

export default Payfast;