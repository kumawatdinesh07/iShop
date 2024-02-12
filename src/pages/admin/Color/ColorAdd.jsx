import React, { useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../../MainContext";

function ColorAdd() {

  const {apiBaseUrl, colorBaseUrl, notify} = useContext(Context);

  const slugRef = useRef();
  const generateSlug = (event) => {
    var slug = event.target.value.toLowerCase().replace(/\s+/g, '-');
    slugRef.current.value = slug;
  }

  const colorSent = (event) => {

    event.preventDefault();

    // const formData = new FormData();
    // formData.append("name", event.target.name.value)
    // formData.append("slug", event.target.slug.value)
    // formData.append("color", event.target.color.value)

    const data = {
      name : event.target.name.value,
      slug : event.target.slug.value,
      color : event.target.color.value
    }
    
    axios.post(apiBaseUrl+colorBaseUrl+"/create", data)
    .then(
      (success) => {
        if(success.data.status === 1){
          notify(success.data.msg, "success");
          event.target.reset();
        }
        else{
          notify(success.data.msg, "error");
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  return (
    <div>
      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Color / Add <hr className="mt-2" />
      </div>
      <form onSubmit={colorSent}>
        <div className="flex w- flex-col gap-[40px] p-4 mt-4">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              onChange={generateSlug} 
              name="name"
              type="text"
              maxLength={8}
              required
              placeholder="Color Name"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-700 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Color Name
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
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
            <input
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
    </div>
  );
}

export default ColorAdd;
