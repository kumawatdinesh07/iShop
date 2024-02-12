import React from 'react'
import { useParams, Link } from 'react-router-dom';
import Container from "../components/Container";

function OrderFailure() {

  const { order_id } = useParams();

  return (
    <Container>
      <div className="bg-gray-100 flex items-center min-h-screen md:min-h-[800px] justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <div className='p-1 border-[3px] border-red-400 rounded-full'>
              <div className="flex-shrink-0 bg-red-300 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-red-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12.79A11.02 11.02 0 0 1 12 23a11.02 11.02 0 0 1-9-4.54A11.02 11.02 0 0 1 2.21 12a11.02 11.02 0 0 1 3.33-7.8M7 10l5 5m0 0l5-5m-5 5V3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-4">Order Pending!</h1>
          <div className='text-xl font-semibold text-center mb-4'>Order ID: {order_id}</div>
          <p className="text-gray-600 text-center mb-6">Oops! It seems there was an issue with your payment. Please review your payment details and try again.</p>
          <div className="flex justify-center">
            <Link to={"/checkout"} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Retry
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default OrderFailure