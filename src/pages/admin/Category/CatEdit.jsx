import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../MainContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CatEdit() {

  const { apiBaseUrl, categoryBaseUrl, notify } = useContext(Context);
  const { id } = useParams();

  const [category, setCotegory] = useState([]);


  const generateSlug = (value) => {
    var slug = value.toLowerCase().replace(/\s+/g, '-');
    return slug;
  }

  useEffect(
    () => {
      axios.get(apiBaseUrl + categoryBaseUrl + `/${id}`)
        .then(
          (success) => {
            if (success.data.status === 1) {
              setCotegory(success.data.category[0])
            }
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        )
    },
    []
  )

  const editCategory = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("image", event.target.image.files[0]);
    axios.patch(apiBaseUrl + categoryBaseUrl + `/edit/${id}`, formData)
      .then(
        (success) => {
          if (success.data.status === 1) {
            notify(success.data.msg, "success")
          } else {
            notify(success.data.msg, "error")
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
  }

  return (
    <div className="">

      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Category / <Link to={'/admin/category'}>View</Link> / Edit <hr className="mt-2" />
      </div>

      <form onSubmit={editCategory}
        className="p-4" encType="multipart/form-data">

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input onChange={(e) => {
            setCotegory(
              {
                ...category,
                name: e.target.value,
                slug: generateSlug(e.target.value)
              }
            )
          }}
            value={category?.name}
            // onChange={generateSlug} 
            name="name"
            type="text"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label
            htmlFor="slug"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Slug
          </label>
          <input
            value={category?.slug}
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
            // value={category?.image}
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

export default CatEdit;
