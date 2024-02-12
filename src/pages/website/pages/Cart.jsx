import React, { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine, RiSubtractLine } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";
import { decrease, increase, removeFromCart, } from "../../../Reducers/Cart";
import { Context } from "../../../MainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { apiBaseUrl, cartBaseUrl, notify } = useContext(Context);

  const { product, prodImgUrl } = useSelector(store => store.product);
  const { cart } = useSelector(store => store.cart);
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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

  const updateQnty = (prodId, qnty) => {
    if (user !== null) {
      axios.post(apiBaseUrl + cartBaseUrl + `/change-qnty/${user._id}/${prodId}/${qnty}`)
        .then(
          (success) => {
            notify(success.data.msg, "success");
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
    }
  }

  const deleteProd = (prodId) => {
    if (user !== null) {
      axios.delete(apiBaseUrl + cartBaseUrl + `/delete-prod/${user._id}/${prodId}`)
        .then(
          (success) => {
            notify(success.data.msg, "success");
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
    }
  }

  function chekout() {
    if (user == null) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  }

  return (
    <>
      <Container
        fluid={true}
        extraclass={
          "hidden md:block w-full py-1 bg-[#F6F7F8] fw-bold text-center fs-4"
        }
      >
        Cart
      </Container>
      <Container>
        {/* For Mobile */}
        <div className="md:hidden">
          {
            cartProduct.map(
              (prod, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-around fw-bold mt-4 p-3 relative"
                  >
                    <div className="">
                      <img
                        src={prodImgUrl + prod.image}
                        alt=""
                        className="img-fluid max-w-[150px] max-h-[150px] pt-2 pl-4"
                      />
                      <button className="text-[#FF6875] absolute top-[0px] left-[10px] fs-5">
                        x
                      </button>
                    </div>
                    <div className="">
                      <div>{prod.name}</div>
                      <div className="flex mt-2 justify-between items-center gap-4">
                        <div className="bg-gray-200 border rounded p- flex justify-center gap-2 items-center">
                          {
                            prod.qnty > 1
                              ?
                              <button className="text-[#33A0FF] fs-5 fw-bold px-2">
                                <RiSubtractLine />
                              </button>
                              :
                              <button className="text-[#33A0FF] fs-5 fw-bold px-2">
                                <RiDeleteBinLine />
                              </button>
                          }
                          <span className="bg-white p-2 px-3">{prod.qnty}</span>
                          <button className="text-[#33A0FF] fs-5 fw-bold px-2">
                            <MdOutlineAdd />
                          </button>
                        </div>
                        <div>${prod.price}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          }
        </div>

        {/* For Desktop */}
        <div className="relative overflow-x-auto mt-5 hidden md:block">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" border-y-[1px] text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  PRODUCT
                </th>
                <th scope="col" className="px-6 py-3">
                  PRICE
                </th>
                <th scope="col" className="px-6 py-3">
                  QTY
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  UNIT PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {
                cartProduct.map(
                  (prod, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white relative border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <button onClick={() => dispatch(removeFromCart({ prodId: prod._id }))}
                          className="text-[#FF6875] absolute fs-4 top-[5px] left-[15px] fs-5">
                          x
                        </button>
                        <th
                          scope="row"
                          className="md:flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={prodImgUrl + prod.image}
                            alt=""
                            className="img-fluid w-[100px] h-[70px]"
                          />
                          <span className="pl-4">{prod.name}</span>
                        </th>
                        <td className="px-6 py-4 text">
                          ${prod.price * prod.qnty}
                        </td>
                        <td className=" py-4">
                          <div className="bg-gray-200 border rounded p- flex justify-around items-center">
                            {
                              prod.qnty > 1
                                ?
                                <button onClick={() => {
                                  updateQnty(prod._id, parseInt(prod.qnty - 1))
                                  dispatch(decrease({ prodId: prod._id }))
                                }}
                                  className="text-[#33A0FF] fs-5">
                                  <RiSubtractLine />
                                </button>
                                :
                                <button onClick={() => {
                                  dispatch(removeFromCart({ prodId: prod._id }))
                                  deleteProd(prod._id)
                                }}
                                  className="text-[#33A0FF] fs-5">
                                  <RiDeleteBinLine />
                                </button>
                            }
                            <span className="bg-white p-2 px-3">
                              {prod.qnty}
                            </span>
                            <button onClick={() => {
                              updateQnty(prod._id, parseInt(prod.qnty + 1))
                              dispatch(increase({ prodId: prod._id }))
                            }}
                              className="text-[#33A0FF] fs-5"
                            >
                              <MdOutlineAdd />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">${prod.price}</td>
                      </tr>
                    );
                  }
                )
              }
            </tbody>
          </table>
        </div>
      </Container>
      <Container>
        <div className="md:flex justify-between p-[40px] md:p-[0px] md:mt-[50px]">
          <div className="w-full">
            <input
              placeholder="Voucher code"
              className="p-2 border focus:outline-none"
            />
            <button className="bg-[#33A0FF] text-white p-2">Redeem</button>
          </div>
          <div className="mt-[50px] md:mt-[0px]">
            <div className="flex justify-between gap-[100px] mb-2">
              <div>Subtotal</div>
              <div>$998</div>
            </div>
            <div className="flex justify-between gap-[100px] mb-2">
              <div>Shipping fee</div>
              <div className="line-through">$20</div>
            </div>
            <div className="flex justify-between gap-[100px] mb-2">
              <div>Coupon</div>
              <div>No</div>
            </div>
            <div className="border-t-[1px] pt-2 flex justify-between gap-[100px] fw-bold fs-3 my-3">
              <div>TOTAL</div>
              <div>${total}</div>
            </div>
            <button onClick={chekout}
              className="bg-[#33A0FF] w-full py-2 rounded text-white">
              Check out
            </button>
          </div>
        </div>
      </Container>
      {/* <div className="flex justify-between relative gap-3 fw-bold mt-4 p-3">
        <div>
          <img src="img/apple_mac.png" alt="" className="img-fluid" />
          <button className="text-[#FF6875] absolute top-[0px] left-[10px] fs-5">
            x
          </button>
        </div>
        <div className="">
          <div>Philips Hue 7W BR30 Connected Downlight Lamp</div>
          <div className="flex mt-2 justify-between item-center">
            <div className="bg-gray-200 rounded p- flex justify-center gap-2 items-center">
              <button className="text-blue-500 fs-5 fw-bold px-2">-</button>
              <span>2</span>
              <button className="text-blue-500 fs-5 fw-bold px-2">+</button>
            </div>
            <div>$998</div>
          </div>
        </div>
      </div>; */}
    </>
  );
}

export default Cart;
