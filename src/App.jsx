import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import Main from './pages/admin/Main';
import CatView from './pages/admin/Category/CatView';
import CatAdd from './pages/admin/Category/CatAdd';
import CatEdit from './pages/admin/Category/CatEdit';
import ColorAdd from './pages/admin/Color/ColorAdd';
import ColorView from './pages/admin/Color/ColorView';
import ColorEdit from './pages/admin/Color/ColorEdit';
import ProductView from './pages/admin/Product/ProductView';
import ProductAdd from './pages/admin/Product/ProductAdd';
import ProductEdit from './pages/admin/Product/ProductEdit';
import WebOutlet from './pages/website/components/WebOutlet';
import Home from './pages/website/pages/Home';
import Store from './pages/website/pages/Store';
import Cart from './pages/website/pages/Cart';
import { useDispatch } from 'react-redux';
import { fatchCategory } from './Reducers/Category';
import { fatchProduct } from './Reducers/Product';
import { getDataFromLS } from './Reducers/Cart';
import Login from './pages/website/pages/Login';
import Signup from './pages/website/pages/Signup';
import AdminLogin from './pages/admin/Accounts/AdminLogin';
import { getUserDataFromLS } from './Reducers/User';
import { getAdminDataFromLs } from './Reducers/Admin';
import Checkout from './pages/website/pages/Checkout';
import OrderSuccess from './pages/website/pages/OrderSuccess';
import OrderFailure from './pages/website/pages/OrderFailure';
import Profile from './pages/website/pages/Profile';
import MyOrders from './pages/website/pages/MyOrders';
import PasswordChange from './pages/website/pages/PasswordChange';
import MyOrdersView from './pages/website/pages/MyOrdersView';
import OrderTimeline from './pages/website/pages/OrderTimeline';
import ResetPassword from './pages/website/pages/ResetPassword';
import Product from './pages/website/pages/Product';
import AdminRegister from './pages/admin/Accounts/AdminRegister';
import Admins from './pages/admin/Accounts/Admins';
import OnlyMultiFile from './pages/website/multi-file/OnlyMultiFile';
import MultiFileForm from './pages/website/multi-file/MultiFileForm';


function App() {

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fatchCategory());
      dispatch(fatchProduct());
      dispatch(getDataFromLS());
      dispatch(getAdminDataFromLs());
      dispatch(getUserDataFromLS());
    },
    []
  )

  const routes = createBrowserRouter(
    [
      {
        path : "/admin/login",
        element : <AdminLogin/>
      },
      {
        path : "/admin",
        element : <Main/>,
        children : [
          {
            path : "",
            element : <Dashboard/>
          },
          {
            path : "category",
            element : <CatView/>
          },
          {
            path : "category/add",
            element : <CatAdd/>
          },
          {
            path : "category/edit/:id",
            element : <CatEdit/>
          },
          {
            path : "color",
            element : <ColorView/>
          },
          {
            path : "color/add",
            element : <ColorAdd/>
          },
          {
            path : "color/edit/:id",
            element : <ColorEdit/>
          },
          {
            path : "product",
            element : <ProductView/>
          },
          {
            path : "product/add",
            element : <ProductAdd/>
          },
          {
            path : "product/edit/:id",
            element : <ProductEdit/>
          },
          {
            path : "admin-register",
            element : <AdminRegister/>
          },
          {
            path : "/admin/users",
            element : <Admins/>
          }
        ]
      },
      {
        path : "/",
        element : <WebOutlet/>,
        children : [
          {
            path : ":slug?",
            element : <Home/>
          },
          {
            path : "/store/:slug?",
            element : <Store/>
          },
          {
            path : "/cart",
            element : <Cart/>
          },
          {
            path : "/checkout",
            element : <Checkout/>
          },
          {
            path : "/order-success/:order_id",
            element: <OrderSuccess/>
          },
          {
            path : "/order-failure/:order_id",
            element: <OrderFailure/>
          },
          {
            path : "/product/:slug_id",
            element : <Product/>
          }
        ]
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : "/signup",
        element : <Signup/> 
      },
      {
        path : "/forgot-password",
        element : <ResetPassword/>
      },
      {
        path : "/profile",
        children : [
          {
            path : "",
            element : <Profile/>
          },
          {
            path : "my-order",
            element : <MyOrders/>,
            // children : [
            //   {
            //     path : "order-details/:order_id",
            //     element : <MyOrdersView/>
            //   }
            // ]
          },
          {
            path : "password-change",
            element : <PasswordChange/>
          },
          {
            path : "order-details/:order_id",
            element : <MyOrdersView/>
          },
          {
            path : "tracking-order",
            element : <OrderTimeline/>
          }
        ]
      },
      {
        path : "/only-multi-file-upload",
        element : <OnlyMultiFile/>
      },
      {
        path : "/multi-file-form",
        element : <MultiFileForm/>
      }
    ]
  )


  return (
    <RouterProvider router={routes}/>
  )
}

export default App;