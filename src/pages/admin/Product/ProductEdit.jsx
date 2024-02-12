import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../MainContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductEdit() {

  const { colors, category, apiBaseUrl, productBaseUrl, proImgUrl, notify } = useContext(Context);
  const {id} = useParams();

  const [product, setProduct] = useState([]);

  const slugRef = useRef();
  const generateSlug = (value) => {
    var slug = value.toLowerCase().replace(/\s+/g, "-");
    return slug;
  };

  const priceRef = useRef();
  const discountRef = useRef();

  const totalPrice = () => {
    const price = priceRef.current.value;
    const discount = discountRef.current.value;
    if(price !== "" && discount !== ""){
        const total = price * discount / 100;
        const finalPrice = price - total;
        return finalPrice;
    }
  }  


  useEffect(
    () => {
      axios.get(apiBaseUrl+productBaseUrl+`/${id}`)
      .then(
        (success) => {
          if(success.data.status === 1){
            setProduct(success.data.product[0]);
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

  const editProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("category_id", event.target.category.value);
    formData.append("color_id", event.target.color.value);
    formData.append("price", event.target.price.value);
    formData.append("discount", event.target.discount.value);
    formData.append("final", event.target.final.value);
    formData.append("details", event.target.details.value);
    formData.append("image", event.target.image.files[0]);
    
    axios.patch(apiBaseUrl+productBaseUrl+`/edit/${id}`, formData)
    .then(
      (success) => {
        if(success.data.status === 1){
          notify(success.data.msg, "success")
          event.target.reset();
          setProduct([]);
        }else{
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
    <div className="shadow h-full">
      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Product / Add <hr className="mt-2" />
      </div>

      <form onSubmit={editProduct}
        className="p-4"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input onChange={
                  (e) => {
                    setProduct(
                      {
                        ...product,
                        name : e.target.value,
                        slug : generateSlug(e.target.value)
                      }
                    )
                  }
              }
              value={product.name}
              name="name"
              type="text"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
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
              value={product.slug}
              name="slug"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select value={product.category_id} onChange={(e) => setProduct({ ...product, category_id : e.target.value })}
              id="category"
              name="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                Choose a Cotegory
              </option>
              {
                category.map(
                (cat, index) => {
                return (
                  <option value={cat._id} key={cat._id}>
                    {index + 1}. {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color
            </label>
            <select value={product.color_id} onChange={ (e) => { setProduct({...product, color_id : e.target.value}) } }
              id="color"
              name="color"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                Choose a Color
              </option>
              {colors.map((color, index) => {
                return (
                  <option
                    value={color._id}
                    className={`text-[${color.color}] font-bold`}
                    key={color._id}
                  >
                    {index + 1}. <span>{color.name}</span>
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input onChange={(e) => setProduct({...product, price : e.target.value, final : totalPrice()})}
              value={product.price}
              ref={priceRef}
              name="price"
              type="number"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            > 
              Discount
            </label>
            <input onChange={
                (e) => setProduct(
                  {
                    ...product, 
                    discount : e.target.value,
                    final : totalPrice()
                  }
                )
              }
              value={product.discount}
              ref={discountRef}
              name="discount"
              type="number"
              //   maxLength={2}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Final
            </label>
            <input
              value={product.final}
              name="final"
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
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

        <div className="mb-6">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Details
          </label>
          <textarea onChange={
              (e) => {
                setProduct(
                  {
                    ...product,
                    details : e.target.value
                  }
                )
              }
            }
            value={product.details}
            name="details"
            className="bg-gray-50 border max-w-[50%] min-h-[80px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          </textarea>
        </div>

        <div className="mb-5">
          <img src={proImgUrl+product.image} alt="" className="p-3 w-[150px] rounded border"/>
        </div>

        <button typeof="submit">
          <span className="bg-[#21357e] px-4 p-2 rounded-xl text-white">
            Submit
          </span>
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
