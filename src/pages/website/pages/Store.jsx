import React, { useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { CgMenuGridR } from "react-icons/cg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaFilter } from "react-icons/fa6";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";


function Store() {

  return (
    <>
      <div className=" hidden md:flex justify-center gap-2 my-5 py-3 w-full bg-[#F6F7F8] fw-bold text-blue-400 ">
        <a href="">Store</a> <span>/</span>
        <a href=""> Accesories</a>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-4 relative ">
          <div className=" hidden lg:block col-span-3 absolut top-0 left-0">
            <Accesories />
            <Prices />
            <Color />
            <Brand />
            <More />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <BannerStore />
            <StoreProBar />
            <StoreProBarIInd />
            <StoreProduct />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Store;

const Accesories = () => {

  const { category } = useSelector(store => store.category);
  const { product } = useSelector(store => store.product);
  const { slug } = useParams();

  return (
    <div className="bg-[#F6F7F8] rounded p-4 ">
      <div className="fw-bold fs-5 mb-2 uppercase">Accesories</div>
      <ul>
        <Link to={`/store`}>
          <li className={`${slug === null ? "text-blue-700" : ""} fw-bold flex justify-between cursor-pointer my-3`}>
            Asseriess <span className="opacity-50">{product.length}</span>{" "}
          </li>
        </Link>
        {
          category.map(
            (cat, ind) => {
              return (
                <Link to={`/store/${cat.slug}`}>
                  <li key={ind} className={`${slug === cat.slug ? "text-blue-700" : ""} fw-bold flex justify-between cursor-pointer  my-3`}>
                    {cat.name} <span className="opacity-50">{cat.count}</span>{" "}
                  </li>
                </Link>
              )
            }
          )
        }
      </ul>
    </div>
  );
};

const Prices = () => {

  return (
    <div className="bg-[#F6F7F8] rounded p-4 my-4">
      <div className="fw-bold fs-5 uppercase">Prices</div>
      <div className="flex justify-between mt-3">
        <div className="fw-bold">Range:</div>
        <div>
          <span>$ 0 </span> - <span> $ 10 </span>
        </div>
      </div>
      <form action="" className="mt-2">
        <label htmlFor="">From</label>
        <input type="text" className="block rounded focus:outline-none px-2" />
        <label htmlFor="">To</label>
        <input type="text" className="block rounded focus:outline-none px-2" />
        <div className="flex gap-4 mt-3">
          <button className="bg-blue-500 rounded-md p-2 text-white">
            Apply
          </button>
          <button className="bg-red-500 rounded-md p-2 text-white">
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};

const Color = () => {
  return (
    <div className="bg-[#F6F7F8] rounded p-4 my-4">
      <div className="fw-bold fs-5 mb-3">COLOR</div>
      <div className="flex justify-around">
        <button className="bg-[#006CFF] p-3 rounded-[50%]"></button>
        <button className="bg-[#FC3E39] p-3 rounded-[50%]"></button>
        <button className="bg-[#171717] p-3 rounded-[50%]"></button>
        <button className="bg-[#FFF600] p-3 rounded-[50%]"></button>
        <button className="bg-[#FF00B4] p-3 rounded-[50%]"></button>
        <button className="bg-[#EFDFDF] p-3 rounded-[50%]"></button>
      </div>
    </div>
  );
};

const Brand = () => {
  return (
    <div className="bg-[#F6F7F8] rounded p-4 my-4">
      <div className="fw-bold fs-5 mb-3">BRAND</div>
      <ul>
        <li className="fw-bold flex justify-between cursor-pointer my-3">
          Apple <span className="opacity-50">00</span>
        </li>
        <li className="fw-bold flex justify-between cursor-pointer my-3">
          LG <span className="opacity-50">00</span>
        </li>
        <li className="fw-bold flex justify-between cursor-pointer my-3">
          Samsung <span className="opacity-50">00</span>
        </li>
        <li className="fw-bold flex justify-between cursor-pointer my-3">
          Siemens <span className="opacity-50">00</span>
        </li>
      </ul>
    </div>
  );
};

const More = () => {
  return (
    <div className="bg-[#F6F7F8] rounded p-4 py-4 text-center fw-bold">
      MORE
    </div>
  );
};

const BannerStore = () => {
  return (
    <>
      <div className="bg-[#2E90E5] h-[300px] md:px-5 md:flex items-center md:justify-around md:rounded">
        <div className="text-white pl-[50px] md:p-0">
          <div className="text-[70px] md:text-[50px]">iPhone 6 Pluse</div>
          <div className="fs-5 my-3">
            <p>Performance and design. Taken right to the edge.</p>
          </div>
          <div className="fw-bold md:fs-4">
            <span className=" py-1 border-b-[5px]">SHOP NOW</span>
          </div>
        </div>
        <div className="md:pr-5 hidden md:flex">
          <img src="img/iphone_8.png" alt="" />
        </div>
        <div className="md:hidden">
          <img src="img/2iphone.png" alt="" className="img-fluid" />
        </div>
      </div>
      <div className="md:hidden flex justify-center gap-2 my-3 py-3 w-full bg-[#F6F7F8] fw-bold text-blue-400 ">
        <a href="">Store</a> <span>/</span>
        <a href=""> Accesories</a>
      </div>
    </>
  );
};

const StoreProBar = () => {
  return (
    <div className="hidden md:flex justify-between bg-[#F6F7F8] rounded p-3 my-4 fw-bold opacity-80">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>13 Items</div>
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <div>Short By </div>
              <select
                name=""
                id=""
                className="bg-[#F6F7F8] focus:outline-none border w-[100px] p-2"
              >
                <option value="">Size</option>
                <option value="">Name</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <div>Show</div>
              <select
                name=""
                id=""
                className="bg-[#F6F7F8] focus:outline-none border w-[100px] p-2"
              >
                <option value="">20</option>
                <option value="">15</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 fs-2">
        <div>
          <CgMenuGridR />
        </div>
        <div>
          <VscThreeBars />
        </div>
      </div>
    </div>
  );
};

const StoreProBarIInd = () => {
  return (
    <div className="md:hidden bg-[#F6F7F8] rounded p-3 my-4 fw-bold opacity-80">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 fs-2">
          <div>
            <CgMenuGridR />
          </div>
          <div>
            <VscThreeBars />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <div>Short By </div>
              <select className="bg-[#F6F7F8] focus:outline-none border w-[100px] p-2">
                <option value="">Name</option>
                <option value="">Size</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <FaFilter />
          <span> Filter</span>
        </div>
      </div>
    </div>
  );
};

const StoreProduct = () => {

  const { category } = useSelector(store => store.category);
  let { product, prodImgUrl } = useSelector(store => store.product);
  const { slug } = useParams();
 
  const categoryData = category.filter(
    (catData) => {
      if(catData.slug === slug){
        return true;
      }else{
        return false;
      }
    }
  )

  if(categoryData[0] !== undefined){
    product = product.filter(
      (prod) => {
        if(prod.category_id === categoryData[0]._id){
          return true;
        }else{
          return false;
        }
      }
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-[0px] px-[40px] gap-4">
        {
          product.map(
            (prod, index) => {
              return (
                <div key={index} className="border-[3px] text-center md:mx-0 mx-[50px] my-2">
                  <div className="flex justify-center px-3 ">
                    <span className="border-b-[1px] py-4">
                      <img src={prodImgUrl + prod.image} alt="" className="" />
                    </span>
                  </div>

                  <div className="fs-5 fw-bold my-3">{prod.name}</div>

                  <div className="flex justify-center my-2 fs-5 gap-1 text-yellow-400">
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiOutlineStar />
                    </span>
                  </div>

                  <div className="flex justify-center gap-4 fs-5 fw-bold mb-3">
                    <div className="text-red-600">{prod.final}</div>
                    <div className="opacity-50 line-through ">{prod.price}</div>
                  </div>
                </div>
              );
            }
          )
        }
      </div>
      <div className="hidden md:flex justify-center fw-bold bg-[#F6F7F8] rounded my-4">
        <div className="p-3 px-4 hover:bg-black cursor-pointer hover:text-white duration-[0.8s] ">
          1
        </div>
        <div className="p-3 px-4 hover:bg-black cursor-pointer hover:text-white duration-[0.8s] ">
          2
        </div>
        <div className="p-3 px-4 hover:bg-black cursor-pointer hover:text-white duration-[0.8s] ">
          3
        </div>
        <div className="p-3 px-4 hover:bg-black cursor-pointer hover:text-white duration-[0.8s] ">
          4
        </div>
        <div className="p-3 px-4 hover:bg-black cursor-pointer hover:text-white duration-[0.8s] ">
          5
        </div>
      </div>
      <div className="md:hidden flex justify-center gap-3 text-black my-4">
        <button className="border-[2px] px-4 py-2 hover:text-white hover:bg-blue-600">Previous</button>
        <button className="border-[2px] px-5 py-2 hover:text-white hover:bg-blue-600">Next</button>
      </div>
    </>
  );
};
