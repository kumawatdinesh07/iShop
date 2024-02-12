import React from 'react'
import ProfileTab from '../components/ProfileTab'

function OrderTimeline() {
    return (
        <>
            <ProfileTab/>
            <div className="flex flex-col items-center mt-10 px-4 sm:px-8 md:px-16 lg:px-32">
                <div className="mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">1</span>
                    </div>
                    <div className="ml-4">
                        <div className="text-xl font-semibold mb-2">Order Placed</div>
                        <p className="text-gray-600">Your order has been successfully placed.</p>
                    </div>
                </div>

                <div className="mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">2</span>
                    </div>
                    <div className="ml-4">
                        <div className="text-xl font-semibold mb-2">Order Confirmed</div>
                        <p className="text-gray-600">Your order has been confirmed and is now being processed.</p>
                    </div>
                </div>

                <div className="mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">3</span>
                    </div>
                    <div className="ml-4">
                        <div className="text-xl font-semibold mb-2">Out for Delivery</div>
                        <p className="text-gray-600">Your order is out for delivery and will be delivered soon.</p>
                    </div>
                </div>

                <div className="mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">4</span>
                    </div>
                    <div className="ml-4">
                        <div className="text-xl font-semibold mb-2">Delivered</div>
                        <p className="text-gray-600">Your order has been successfully delivered. Thank you for shopping with us!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderTimeline