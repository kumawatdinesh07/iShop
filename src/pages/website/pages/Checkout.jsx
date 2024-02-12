import React, { useEffect, useState } from 'react'
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import useRazorpay from "react-razorpay";
import { emptyCart } from '../../../Reducers/Cart';
import { useNavigate } from "react-router-dom";

function Checkout() {

    const [Razorpay] = useRazorpay();

    const [userData, setUserData] = useState({});

    const { user } = useSelector(store => store.user);
    const { cart } = useSelector(store => store.cart);
    const { product, prodImgUrl } = useSelector(store => store.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            setUserData(user);
        },
        [user]
    )

    let cartProduct = [];

    let total = 0;
    product.forEach(
        (prod) => {
            cart.forEach(
                (item) => {
                    if (prod._id === item.prodId) {
                        cartProduct.push(
                            {
                                ...prod,
                                qnty: item.qnty
                            }
                        );
                        total += prod.final * item.qnty;
                    }
                }
            );
        }
    );

    function placeOrder() {
        axios.post(
            "http://localhost:5000/order/place-order",
            {
                user_details: userData,
                order_details: cartProduct,
                user_id: user._id,
                order_total: total
            }
        ).then(
            (success) => {
                if (success.data.status === 1) {
                    razorPayPayment(success.data.order, success.data.razorOrder);
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    function razorPayPayment(order, razorOrder) {
        const options = {
            key: "rzp_test_peSDjAaoBXrc83", // Enter the Key ID generated from the Dashboard
            amount: razorOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "iShop",
            description: "",
            image: <img src="img/iSHOP Logo.svg" alt="" />,
            order_id: razorOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                axios.post(
                    "http://localhost:5000/order/order-success",
                    {
                        response,
                        order,
                        razorOrder
                    }
                ).then(
                    (success) => {
                        if (success.data.status === 1) {
                            dispatch(emptyCart());
                            navigate(`/order-success/${order._id}`)
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
            },
            prefill: {
                name: order.user_details.name,
                email: order.user_details.email,
                contact: order.user_details.contact,
            },
            notes: {
                address: order.user_details.address,
            },
            theme: {
                color: "#FF6875",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            axios.post(
                "http://localhost:5000/order/order-failure",
                {
                    response,
                    order,
                    razorOrder
                }
            ).then(
                (success) => {
                    if (success.data.status === 1) {
                        navigate(`/order-failure/${order._id}`)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        });

        rzp1.open();
    }

    return (
        <Container>
            <div className="h-screen grid grid-cols-3">
                <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                    <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-yellow-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 sm:w-5 h-6 sm:h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="text-sm font-medium ml-3">Checkout</div>
                        </div>
                        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
                            Complete your shipping and payment details below.
                        </div>
                        <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="rounded-md">
                        <form
                            id="payment-form" method="POST" action="">
                            <section>
                                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                                    Shipping &amp; Billing Information
                                </h2>
                                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Name</span>
                                        <input onChange={
                                            (ev) => {
                                                setUserData(
                                                    {
                                                        ...userData,
                                                        name: ev.target.value
                                                    }
                                                )
                                            }
                                        }
                                            value={userData?.name}
                                            name="name"
                                            className="focus:outline-none w-full px-3"
                                            placeholder="paste your name here....."
                                            required=""
                                        />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Email</span>
                                        <input
                                            onChange={
                                                (ev) => {
                                                    setUserData(
                                                        {
                                                            ...userData,
                                                            email: ev.target.value
                                                        }
                                                    )
                                                }
                                            }
                                            value={userData?.email}
                                            name="email"
                                            type="email"
                                            className="focus:outline-none w-full px-3"
                                            placeholder="try@example.com"
                                            required=""
                                        />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Contact</span>
                                        <input onChange={
                                            (ev) => {
                                                setUserData(
                                                    {
                                                        ...userData,
                                                        contact: ev.target.value
                                                    }
                                                )
                                            }
                                        }
                                            value={userData?.contact}
                                            name="contact"
                                            type="text"
                                            className="focus:outline-none px-3 w-full"
                                            placeholder="contact number....."
                                            required
                                        />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-[100px] py-3 items-center">
                                        <span className="text-right px-2">Address</span>
                                        <textarea onChange={
                                            (ev) => {
                                                setUserData(
                                                    {
                                                        ...userData,
                                                        address: ev.target.value
                                                    }
                                                )
                                            }}
                                            value={userData?.address}
                                            required
                                            placeholder="paste your name here....."
                                            className='w-full h-full focus:outline-none px-3'>
                                        </textarea>
                                    </label>
                                    {/* <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">City</span>
                                        <input
                                            name="city"
                                            className="focus:outline-none px-3"
                                            placeholder="San Francisco"
                                        />
                                    </label>
                                    <label className="inline-flex w-2/4 border-gray-200 py-3">
                                        <span className="text-right px-2">State</span>
                                        <input
                                            name="state"
                                            className="focus:outline-none px-3"
                                            placeholder="CA"
                                        />
                                    </label>
                                    <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                                        <span className="text-right px-2 xl:px-0 xl:text-none">ZIP</span>
                                        <input
                                            name="postal_code"
                                            className="focus:outline-none px-3"
                                            placeholder={98603}
                                        />
                                    </label>
                                    <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                        <span className="text-right px-2">Country</span>
                                        <div
                                            id="country"
                                            className="focus:outline-none px-3 w-full flex items-center"
                                        >
                                            <select
                                                name="country"
                                                className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                                            >
                                                <option value="AU">Australia</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BR">Brazil</option>
                                                <option value="CA">Canada</option>
                                                <option value="CN">China</option>
                                                <option value="DK">Denmark</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IT">Italy</option>
                                                <option value="JP">Japan</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MX">Mexico</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="SG">Singapore</option>
                                                <option value="ES">Spain</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US" selected="selected">
                                                    United States
                                                </option>
                                            </select>
                                        </div>
                                    </label> */}
                                </fieldset>
                            </section>
                        </form>
                    </div>
                    {/* <div className="rounded-md">
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                                Payment Information
                            </h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Card</span>
                                    <input
                                        name="card"
                                        className="focus:outline-none px-3 w-full"
                                        placeholder="Card number MM/YY CVC"
                                        required=""
                                    />
                                </label>
                            </fieldset>
                        </section>
                    </div> */}
                    <button onClick={placeOrder}
                        className="submit-button px-4 py-3 rounded-full bg-[#FF6875] text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                        Pay ₹ {total}
                    </button>
                </div>
                <div className="col-span-1 bg-white lg:block hidden">
                    <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
                        Order Summary
                    </h1>
                    <ul className="py-6 border-b space-y-6 px-8">
                        {
                            cartProduct.map(
                                (prod, index) => {
                                    return (
                                        <li key={index} className="grid grid-cols-6 gap-2 border-b-1">
                                            <div className="col-span-1 self-center">
                                                <img
                                                    src={prodImgUrl + prod.image}
                                                    alt="Product"
                                                    className="rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col col-span-3 pt-2">
                                                <span className="text-gray-600 text-md font-semi-bold">
                                                    {prod.name}
                                                </span>
                                                <span className="text-gray-400 text-sm inline-block pt-2">Phone</span>
                                            </div>
                                            <div className="col-span-2 pt-3">
                                                <div className="flex items-center space-x-2 text-sm justify-between">
                                                    <span className="text-gray-400">{prod.qnty} x {prod.price}</span>
                                                    <span className="text-red-400 font-semibold inline-block">
                                                        ₹ {prod.price * prod.qnty}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            )
                        }

                    </ul>
                    <div className="px-8 border-b">
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-red-500">₹{total}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="font-semibold text-red-500">Free</span>
                        </div>
                    </div>
                    <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                        <span>Total</span>
                        <span>₹ {total}</span>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default Checkout;