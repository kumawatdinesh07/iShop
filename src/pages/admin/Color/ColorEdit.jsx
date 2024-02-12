import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { Context } from "../../../MainContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ColorEdit() {
  const {apiBaseUrl, colorBaseUrl, notify} = useContext(Context);

  const slugRef = useRef();
  const generateSlug = (event) => {
    var slug = event.target.value.toLowerCase().replace(/\s+/g, '-');
    slugRef.current.value = slug;
  }

  const {id} = useParams();
   
  const [color, setColor] = useState([]);
 
  const getDataById = () => {
    if(id !== null && id !== undefined){
      axios.get(apiBaseUrl+colorBaseUrl+`/${id}`)
      .then(
        (success) => {
          if(success.data.status === 1){
            setColor(success.data.color[0]);
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    }
  }
  useEffect(
    () => {
      getDataById();
    },[]
  )

  const sendColorData = (event) => {
    event.preventDefault();
    const data = {
      name : event.target.name.value,
      slug : event.target.slug.value,
      color : event.target.color.value
    }
    axios.patch(apiBaseUrl+colorBaseUrl+`/update/${id}`, data)
    .then(
      (success) => {
        if(success.data.status === 1){
          event.target.reset();
          notify(success.data.msg, "success");
          setColor([]);
        }else{
          notify(success.data.msg, "error");
        }
      }
    ).catch(
      (error) => {
        notify("Internal Server Error", "error");
      }
    )
  }

  return (
    <>
      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Color / Edit <hr className="mt-2" />
      </div>
      <form onSubmit={sendColorData}>
        <div className="flex w- flex-col gap-[40px] p-4 mt-4">
          <div className="relative h-11 w-full min-w-[200px]">
            <input onChange={
              (e) => {
                setColor(
                  {
                    ...color,
                    name: e.target.value
                  }
                )
              }
            }
              value={color?.name}
              onKeyUp={generateSlug}
              // onChange={generateSlug} 
              name="name"
              type="text"
              required
              placeholder="Color Name"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-700 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Color Name
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input onChange={
              (e) => {
                setColor(
                  {
                    ...color,
                    slug: e.target.value
                  }
                )
              }
            }
              value={color?.slug}
              ref={slugRef}
              name="slug"
              type="text"
              required
              placeholder="color-slug"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Color Slug
            </label>
          </div>
          <div className=" border-b h-11 max-w-[100px]">
            <label className="after:content[' ']  pointer-events-none  h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-600 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Color
            </label>
            <input onChange={
              (e) => {
                setColor(
                  {
                    ...color,
                    color: e.target.value
                  }
                )
              }
            }
              value={color?.color}
              name="color"
              type="color"
              required
              className="peer border h-[30px]  w-[60px] border-b border-blue-gray-200 bg-transparent font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          <div>
            <button typeof="submit">
              <span className="bg-[#21357e] px-4 p-2 rounded-xl text-white">
                Save
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ColorEdit;