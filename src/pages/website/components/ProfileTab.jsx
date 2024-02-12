import Container from './Container'
import { Link, useLocation } from 'react-router-dom'
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { PiUser } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logOut } from "../../../Reducers/User";
import { emptyCart } from "../../../Reducers/Cart";
import { FaCircleUser } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

function ProfileTab({ path }) {

    const { pathname } = useLocation();

    const { cart } = useSelector(store => store.cart);
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    return (
        <>
            <Container fluid={true} extraclass="border-y md:py-1 sticky-top bg-white">
                <Container extraclass="md:px-4">
                    <div className="hidden md:flex justify-between py- fw-bold ">
                        <div className="d-flex gap-5">
                            <div className="flex items-center gap-2 opacity-75">
                                <span>EN</span>
                                <span>
                                    <AiFillCaretDown />
                                </span>
                            </div>

                            <div className="d-flex items-center gap-2 opacity-75">
                                <span>$</span>
                                <span>
                                    <AiFillCaretDown />
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            {
                                user === null
                                    ?
                                    <div className="flex items-center gap-2">
                                        <span className="fs-3">
                                            <Link to={"/login"}>
                                                <PiUser />
                                            </Link>
                                        </span>
                                        <span>Login</span>
                                    </div>
                                    :
                                    <div className="flex items-center gap-2">
                                        <span className="fs-3">
                                            <button onClick={
                                                () => {
                                                    localStorage.removeItem("cart");
                                                    dispatch(emptyCart());
                                                    dispatch(logOut());
                                                }
                                            }
                                            >
                                                <Link to={"/login"}>
                                                    <RiLogoutCircleRLine />
                                                </Link>
                                            </button>
                                        </span>
                                        <Link to={"/profile"}>
                                            <span>{user.name}</span>
                                        </Link>
                                    </div>
                            }


                            <div className="flex items-center gap-2">
                                <span className="fs-4 relative p-2 px-3">
                                    <Link to={"/cart"}>
                                        <BsCart3 />
                                    </Link>
                                    <span className="absolute top-0 right-0 text-[10px] bg-[#FF6875] text-white rounded-[100%] p-1 px-2">
                                        {cart.length}
                                    </span>
                                </span>
                                <span className="opacity-50">$998</span>
                                <span>
                                    <HiSearch />
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Container>

            <Container extraclass="pt-5 px-4 md:flex justify-content-between">
                <div className='md:flex'>
                    <div className={`${pathname === "/profile" ? 'text-blue-700 shadow border-blue-700 border-[2px]' : ''} text-xl font-bold opacity-90 py-2 px-3`}>
                        <Link to={"/profile"} className='flex gap-2 items-center'><FaCircleUser /> <span>Profile</span></Link>
                    </div>
                    <div className={`${pathname === "/profile/my-order" ? 'text-blue-700 shadow border-blue-700 border-[2px]' : ''} text-xl font-bold opacity-90 py-2 px-3`}>
                        <Link to={"/profile/my-order"} className='flex gap-2 items-center'><FaBorderAll /> <span>Orders</span></Link>
                    </div>
                    <div className={`${pathname === "/profile/password-change" ? 'text-blue-700 shadow border-blue-700 border-[2px]' : ''} text-xl font-bold opacity-90 py-2 px-3`}>
                        <Link to={"/profile/password-change"} className='flex gap-2 items-center'><MdEditSquare /> <span>Password Change</span></Link>
                    </div>
                </div>
                <div className='text-xl  text-blue-500 font-serif font-bold py-2 px-3'>
                    <Link to={"/"}>Back to Home</Link>
                </div>
            </Container>
        </>
    )
}

export default ProfileTab