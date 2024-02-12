import React, { useContext, useEffect } from "react";
import { Context } from "../../../MainContext";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';

function CatView() {

  const { category, fetchCategory, apiBaseUrl, categoryBaseUrl, notify, catImgUrl, fetchColor } = useContext(Context);
  
  useEffect(
    () => {
      fetchCategory()
      fetchColor()
    },[]
  )

  const changeStatus = (id,newStatus) => {
    axios.patch(apiBaseUrl+categoryBaseUrl+`/change-status/${id}/${newStatus}`)
    .then(
      (success) => {
        if(success.data.status === 1){
          fetchCategory();
          notify(success.data.msg, "success");
        }else{
          notify(success.data.msg, "error");
        }
      }
    ).catch(
      (error) =>  {
        console.log(error);
      }
    )
  }

  const deleteCategory = (id) => {
    // console.log(id);
    axios.delete(apiBaseUrl+categoryBaseUrl+`/delete/${id}`)
    .then(
      (success) => {
        if(success.data.status === 1){
          fetchCategory();
          notify(success.data.msg, "success")
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
    <div>
      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Category / View <hr className="mt-2" />
      </div>
      <div> 
        <div className="relative overflow-x-auto">
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
                <th scope="col" className="px-1 text-center py-3 border">
                  Status
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
                category.map(
                (cat, index) => {
                return (
                  <tr key={cat._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-center py-4 border">{index+1}</th>
                    <th className="">
                      <img
                        src={catImgUrl+cat.image}
                        alt=""
                        className="w-[90px] ml-6 p-2"
                      />
                    </th>
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border"
                    >
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 border">{cat.slug}</td>
                    <td className={`mt-6 text-white text-[14px] text-center`}>
                      <button onClick={() => changeStatus(cat._id, !cat.status)}
                        className={`${cat.status=== false ? "bg-orange-500" : "bg-blue-500 px-[10px]"} rounded p-1`}>
                          {cat.status === true ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="border text-center">
                      <button onClick={() => deleteCategory(cat._id)}
                        className=" rounded text-ehite pl-2">
                          <span className="text-[red] text-2xl "><AiTwotoneDelete/></span>
                      </button>
                    </td>
                    <td className="border text-center">
                        <Link to={`edit/${cat._id}`}>
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
  );
}

export default CatView;
