import React from 'react'
import Container from "../components/Container";
import { useParams, Link } from 'react-router-dom';

function OrderSuccess() {

    const { order_id } = useParams();

    return (
        <Container>
            {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <div className={`flex items-center justify-center mb-6 ${success ? 'text-green-500' : 'text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-16 w-16">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={success ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}></path>
                        </svg>
                    </div>
                    <h1 className={`text-3xl font-semibold text-center mb-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                        {success ? 'Order Successful!' : 'Order Failed'}
                    </h1>
                    {success && (
                        <div>
                            <p className="text-gray-600 text-center mb-2">Order Number: {orderNumber}</p>
                            <p className="text-gray-600 text-center mb-2">Items Purchased: {items.join(', ')}</p>
                            <p className="text-gray-600 text-center mb-6">Total Amount: ${totalAmount}</p>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <a href="/" className={`px-4 py-2 rounded-full transition duration-300 ${success ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                            {success ? 'Continue Shopping' : 'Go Back'}
                        </a>
                    </div>
                </div>
            </div> */}
            <div className="bg-gray-100 flex items-center min-h-screen md:min-h-[600px] justify-center">
                <div className="bg-white p-10 rounded-lg shadow-md max-w-md w-full">
                    <div className="flex items-center justify-center mb-6">
                        <div className='p-1 border-[5px] border-green-400 rounded-full'>
                            <div className='bg-green-200 rounded-full p-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 h-16 w-16">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-semibold text-center mb-4">Order Successful!</h1>
                    <div className='text-xl font-semibold text-center mb-4'>Order ID: {order_id}</div>
                    <p className="text-gray-600 text-center mb-6">Thank you for your purchase. Your order has been successfully processed.</p>
                    <div className="flex justify-center">
                        <Link to={"/"} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default OrderSuccess;