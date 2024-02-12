import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import ProfileTab from '../components/ProfileTab'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { orderDetails } from '../../../Reducers/Order';
import { PiPoliceCarThin } from "react-icons/pi";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  const { user } = useSelector(store => store.user);
  const { order } = useSelector(store => store.order)
  const dispatch = useDispatch();

  useEffect(
    () => {
      if(order !== undefined){
        setOrders(order);
      }
    },[]
  )

  useEffect(
    () => {
      if (user !== null) {
        axios.get(`http://localhost:5000/order/user-order/${user._id}`)
          .then(
            (success) => {
              if (success.data.status === 1) {
                dispatch(orderDetails({ order: success.data.order }));
              }
            }
          ).catch(
            (error) => {
              console.log(error);
            }
          )
      }
    },
    []
  )

  return (
    <Container>
      <ProfileTab />
      {
        orders.map(
          (ord, index) => {
            return (
              <div key={index} className="mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg">
                <div>
                  <div className="text-xl font-semibold mb-4 text-gray-700">Order Summary</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600">Order ID:</p>
                      <p className="font-semibold">{ord._id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Date:</p>
                      <p className="font-semibold">{ord.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Total:</p>
                      <p className="font-semibold">₹{ord.order_total}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between'>
                  {
                    ord.order_status === 1
                      ?
                      <div className="text-xl text-right font-semibold mt-4 text-green-600">
                        Order Success
                      </div>
                      :
                      <div className="text-xl text-right font-semibold mt-4 text-orange-600">
                        Order Failed
                      </div>
                  }
                  <div className="text-xl text-right font-semibold mt-4 text-gray-700 hover:text-blue-600">
                    <Link to={`/profile/order-details/${ord._id}`} className='flex gap-2 justify-center items-center'>
                      <span>View Order Details</span> <PiPoliceCarThin />
                    </Link>
                  </div>
                </div>

              </div>
            )
          }
        )
      }
    </Container>
  )
}

export default MyOrders