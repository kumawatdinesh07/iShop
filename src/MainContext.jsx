import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Context = createContext();

function MainContext(props) {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const categoryBaseUrl = process.env.REACT_APP_CATEGORY_BASE_URL;
  const colorBaseUrl = process.env.REACT_APP_COLOR_BASE_URL;
  const productBaseUrl = process.env.REACT_APP_PRODUCT_BASE_URL;
  const userBaseUrl = process.env.REACT_APP_USER_BASE_URL;
  const adminBaseUrl = process.env.REACT_APP_ADMIN_BASE_URL;
  const cartBaseUrl = process.env.REACT_APP_CART_BASE_URL;

  const notify = (msg, type) => toast(msg, { type });

  const [category, setCategory] = useState([]);
  const [catImgUrl, setCatImgUrl] = useState(null);
  const [colors, setColor] = useState([]);
  const [product, setProduct] = useState([]);
  const [proImgUrl, setProImgUrl] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [admin, setAdmin] = useState(null);
  // const [from, setFrom] = useState(null);
  // const [to, setTo] = useState(null);
  // const [apply, setApply] = useState(null);

  // toast.info("Info Notification !", {
  //   position: toast.POSITION.BOTTOM_CENTER
  // });

  useEffect(
    () => {
      fetchCategory();
      fetchColor();
      fetchProduct();
    },
    []
  )

  const fetchCategory = () => {
    axios.get(apiBaseUrl + categoryBaseUrl)
      .then(
        (success) => {
          if (success.data.status === 1) {
            setCategory(success.data.category);
            setCatImgUrl(success.data.baseUrl);
          }
        }
      ).catch(
        (error) => {
          setCategory([]);
        }
      )
  }

  const fetchColor = () => {
    axios.get(apiBaseUrl + colorBaseUrl)
      .then(
        (success) => {
          if (success.data.status === 1) {
            setColor(success.data.color);
          }
        }
      ).catch(
        (error) => {
          setCategory([]);
        }
      )
  }

  const fetchProduct = () => {
    axios.get(apiBaseUrl + productBaseUrl)
      .then(
        (success) => {
          if (success.data.status === 1) {
            setProduct(success.data.product);
            setProImgUrl(success.data.baseUrl);
          }
        }
      ).catch(
        (error) => {
          setProduct([]);
        }
      )
  }


  return (
    <Context.Provider
      value={{
        apiBaseUrl, categoryBaseUrl, productBaseUrl, notify,
        category, fetchCategory, catImgUrl,
        colors, fetchColor, colorBaseUrl,
        product, fetchProduct, proImgUrl,
        activeCat, setActiveCat,
        userBaseUrl, adminBaseUrl,
        admin, setAdmin, cartBaseUrl
      }}>

      <ToastContainer />
      {props.children}
    </Context.Provider>
  )
}

export default MainContext;

export { Context };

// .env -> environment