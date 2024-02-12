import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Context } from '../../../MainContext';
import { userCart } from '../../../Reducers/Cart';

function WebOutlet() {

  const { apiBaseUrl, cartBaseUrl } = useContext(Context);

  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (user !== null) {
        axios.get(apiBaseUrl + cartBaseUrl + "/user-cart/" + user._id)
          .then(
            (success) => {
              if (success.data.status === 1) {
                const userCartData = success.data.userCart.map(
                  (d) => {
                    return (
                      {
                        prodId: d.prodId,
                        qnty: d.qnty
                      }
                    )
                  }
                )
                localStorage.setItem("cart", JSON.stringify(userCartData));
                dispatch(userCart({ userCart: userCartData }))
              }
            }
          ).catch(
            (error) => {
              console.log(error);
            }
          )
      }
    },
    [user]
  )

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default WebOutlet
