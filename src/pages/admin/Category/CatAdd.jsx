import React, { useContext, useRef } from "react";
import { Context } from "../../../MainContext";
import axios from "axios";

function CatAdd() {

  const {apiBaseUrl, categoryBaseUrl, notify} = useContext(Context);

  const slugRef = useRef();
  const generateSlug = (event) => {
    var slug = event.target.value.toLowerCase().replace(/\s+/g, '-');
    slugRef.current.value = slug;
  }

  const submitData = (event) => {

    event.preventDefault();

    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("image", event.target.image.files[0]);

    // const data = {
    //   name : event.target.name.value,
    //   slug : event.target.slug.value
    // }
    
    axios.post(apiBaseUrl+categoryBaseUrl+"/create", formData)
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
    <div className="shadow h-full">
      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Category / Add <hr className="mt-2" />
      </div>

      <form className="p-4" onSubmit={submitData} encType="multipart/form-data">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input 
            onChange={generateSlug} 
            name="name"
            type="text"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="mb-6">
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Slug
          </label>
          <input
            ref={slugRef}
            name="slug"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readOnly
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          typeof="submit"
        >
          <span className="bg-[#21357e] px-4 p-2 rounded-xl text-white">Submit</span>
        </button>
      </form>
    </div>
  );
}

export default CatAdd;
