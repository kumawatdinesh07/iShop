import React, { useEffect, useState } from "react";
import Container from "./Container";
import { AiFillCaretDown, AiOutlineCloseSquare } from "react-icons/ai";
import { FaRegUser, FaBars } from "react-icons/fa";
import { BsBagDash, BsCart3 } from "react-icons/bs";
import { HiSearch } from "react-icons/hi";
import { PiUser } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logOut } from "../../../Reducers/User";
import { emptyCart } from "../../../Reducers/Cart";
import ReactSearchBox from "react-search-box";
import { selectProd } from "../../../Reducers/SelectedProd";

function Header() {

  const [menuToggle, setMenuToggle] = useState(false);

  const [searchData, setSearchData] = useState([]);

  const { cart } = useSelector(store => store.cart);
  const { user } = useSelector(store => store.user);
  const { product } = useSelector(store => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (product.length !== 0) {
        const data = product.map(
          (prod) => {
            return (
              {
                key: prod.slug,
                value: prod.name
              }
            )
          }
        )
        setSearchData(data);
      }
    }, []
  )

  const menuItems = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "STORE",
      link: "/store",
    },
    {
      name: "IPHONE",
      link: "/iphone",
    },
    {
      name: "IPAD",
      link: "/ipad",
    },
    {
      name: "MACBOOK",
      link: "/macbook",
    },
    {
      name: "ACCESSORIES",
      link: "/accessories",
    },
  ];

  return (
    <>
      <Container fluid={true} extraclass="border md:py-1 sticky-top bg-white">
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

                <form>
                  <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div> */}
                    <ReactSearchBox leftIcon={<HiSearch />} type="search"
                      onSelect={(record) => dispatch(selectProd({ selectProd: record.item.key }))}
                      data={searchData}
                      placeholder="Search..."
                    />
                    {/* <input type="search" id="default-search" className="block w-full py-2 pr-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...." required /> */}
                  </div>
                </form>

              </div>
            </div>
          </div>
        </Container>
      </Container>

      <Container extraclass="px-2">
        <div className="flex px-[10px] py-[15px] md:py-[0px] md:justify-center justify-between items-center my-2 md:my-3 md:pt-3">
          <img src="img/iSHOP Logo.svg" alt="" />

          <div className="md:hidden fs-4">
            <FaBars onClick={() => setMenuToggle(true)} />
          </div>
        </div>

        {/* -----------------Mobile Menu----------------- */}
        <ul
          className={`md:hidden flex flex-col justify-center items-center gap-5 fw-bold
                 fixed ${menuToggle === true ? "left-[0%]" : "left-[-100%]"
            } top-0 duration-1000 text-center bg-[rgba(0,0,0,0.8)] text-white w-full h-[100vh]`}
          style={{
            zIndex: "9999",
          }}
        >
          <div>
            <li className="fw-bold fs-1 absolute top-4 left-2 ">
              <AiOutlineCloseSquare onClick={() => setMenuToggle(false)} />
            </li>

            <div className="flex gap-4 justify-center py-2 fw-bold border-b-[2px]">
              <div className="d-flex gap-3">
                <div className="flex items-center gap-2">
                  <span>
                    <Link to={"/cart"}>
                      <BsBagDash />
                    </Link>
                  </span>
                  <span>2 Items</span>
                  <span className="opacity-50">$998</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span>
                  <FaRegUser />
                </span>
                <span>My profile</span>
              </div>

              <div className="flex fw-bold gap-2">
                <div className="flex items-center gap-1 ">
                  <span>EN</span>
                  <span>
                    <AiFillCaretDown />
                  </span>
                </div>

                <div className="d-flex items-center gap-1">
                  <span>$</span>
                  <span>
                    <AiFillCaretDown />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form action="">
            <div className="flex items-center gap-3  bg-white border rounded-[50px] overflow-hidden px-3 py-2">
              <span className="text-black fs-1">
                <HiSearch />
              </span>

              <input
                type="text"
                className="h-[40px]  flex-grow-1 focus:outline-none border-none p-2"
              />
            </div>
          </form>
          {menuItems.map((item, index) => {
            return (
              <li className="cursor-pointer p-2" key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>

        {/* ----------------------------------Desktop Menu------------------------ */}

        <ul className="hidden my-4 md:flex justify-center gap-5 fw-bold mt-4">
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="cursor-pointer">
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}

export default Header;
