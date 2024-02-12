import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useContext, useEffect } from 'react';
import { Context } from '../../../MainContext';
import axios from 'axios';

function ProductView() {

  const { product, fetchProduct, proImgUrl, apiBaseUrl, productBaseUrl, notify } = useContext(Context);
  
  useEffect(
    () => {
      fetchProduct();
    },[]
  )

  const changeProdStatus = (id, newStatus) => {
    axios.patch(apiBaseUrl+productBaseUrl+ `/change-status/${id}/${newStatus}`)
    .then(
      (success) => {
        if(success.data.status === 1) {
          notify(success.data.msg, "success")
          fetchProduct()
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

  const changeBestSeller = (id, bestSeller) => {
    axios.patch(apiBaseUrl+productBaseUrl+`/best-seller/${id}/${bestSeller}`)
    .then(
      (success) => {
        if(success.data.status === 1){
          notify(success.data.msg, "success");
          fetchProduct();
        }else{
          notify(success.data.msg, "error");
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  const deleteProduct = (id) => {
    axios.delete(apiBaseUrl+productBaseUrl+`/delete/${id}`)
    .then(
      (success) => {
        if(success.data.status === 1){
          notify(success.data.msg, "success");
          fetchProduct();
        }else{
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
      Product / View <hr className="mt-2" />
    </div>
    <div>
      <div className=" h-[600px] scroll-smooth overflow-auto relative ">
        <table className="w-full border-[2px] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="text-center py-3 border">
                Sr. No.
              </th>
              <th scope="col" className="px-6 py-3 border">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3 border">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Slug
              </th>
              <th scope="col" className="text-center px-3 py-3 border">
                Details
              </th>
              <th scope="col" className="text-center px-3 py-3 border">
                Price
              </th>
              <th scope="col" className="py-3 text-center border">
                Discount
              </th>
              <th scope="col" className="text-center px-3 py-3 border">
                Final
              </th>
              <th scope="col" className="px-1 text-center py-3 border">
                Status
              </th>
              <th scope="col" className="px-1 text-center py-3 border">
                Best Seller
              </th>
              <th scope="col" className="px-1 text-center py-3 border">
                Delete
              </th>
              <th scope="col" className="px-1 text-center py-3 border">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {
              product.map(
              (prod, index) => {
              return (
                <tr key={prod._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="text-center py-4 border">{index+1}</th>
                  <th className="">
                    <img
                      src={proImgUrl+prod.image}
                      alt=""
                      className="w-[90px]  ml-6 p-2"
                    />
                  </th>
                  <td
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border"
                  >
                    {prod.name}
                  </td>
                  <td className="px-6 py-4 border">{prod.slug}</td>
                  <td className="text-center py-4 border text-[10px] w-52 h-10 overflow-hidden">{prod.details}</td>
                  <td className="text-center py-4 border">$ {prod.price}</td>
                  <td className="text-center py-4 border">{prod.discount}%</td>
                  <td className="text-center py-4 border">$ {prod.final}</td>
                  <td className={`mt-6 px-3 text-white text-[14px] text-center`}>
                    <button onClick={() => changeProdStatus(prod._id, !prod.status)}
                      className={`${prod.status === true ? 'bg-blue-600 px-2' : "bg-[orange]"} rounded p-1`}>
                        {prod.status === true ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className={`mt-6 text-white text-[14px] text-center border`}>
                    <button onClick={() => changeBestSeller(prod._id, !prod.bestseller)}
                      className={`${prod.bestseller === true ? 'bg-blue-600 px-2' : "bg-[orange] px-3"} rounded p-1`}>
                        {prod.bestseller === true ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="border text-center">
                    <button onClick={() => deleteProduct(prod._id)}
                      className="rounded text-ehite pl-2">
                        <span className="text-[red] text-2xl "><AiTwotoneDelete/></span>
                    </button>
                  </td>
                  <td className="border text-center">
                      <Link to={`edit/${prod._id}`}>
                        <button className="pl-2">
                           <span className="text-[green] text-2xl"><FaEdit/></span>
                        </button>
                      </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default ProductView