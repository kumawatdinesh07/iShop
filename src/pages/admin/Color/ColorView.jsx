import React, { useContext, useEffect } from "react";
import { Context } from "../../../MainContext";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

function ColorView() {

  const { colors, fetchColor, apiBaseUrl, colorBaseUrl, notify } = useContext(Context);

  useEffect(
    () => {
      fetchColor();
    }, []
  )

  const deleteColor = (id) => {
    axios.delete(apiBaseUrl + colorBaseUrl + `/delete/${id}`)
      .then(
        (success) => {
          if (success.data.status === 1) {
            notify(success.data.msg, "success")
            fetchColor();
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

  const changeStatus = (id, newStatus) => {
    axios.patch(apiBaseUrl + colorBaseUrl + `/change-status/${id}/${newStatus}`)
      .then(
        (success) => {
          if (success.data.status === 1) {
            fetchColor();
            notify(success.data.msg, "success")
          }
        }
      ).then(
        (error) => {
          console.log(error);
        }
      )
  }


  return (
    <>
      <div className="text-2xl font-bold opacity-80 py-2 px-3">
        Color / View <hr className="mt-2" />
      </div>
      <div className="max-h-[70vh] relative mt-3 overflow-x-auto border-[2px] overflow-auto ">
        <table className=" w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="text-center py-3 border">
                #
              </th>
              <th scope="col" className="px-6 py-3 border">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Slug
              </th>
              <th scope="col" className="pl-6 py-3 border">
                Color
              </th>
              <th scope="col" className="px- text-center py-3 border">
                Status
              </th>
              <th scope="col" className="text-center py-3 border">
                Delete
              </th>
              <th scope="col" className="px-2 text-center py-3 border">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {
              colors.map(
                (color, index) => {
                  return (
                    <tr
                      key={color._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                    >
                      <th className="px-2 border text-center">{index + 1}</th>
                      <th className="px-4">{color.name}</th>
                      <td className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border">
                        {color.slug}
                      </td>
                      <td className="pl-4 py-4 border text-black ">
                        <span className={`bg-[${color.color}] p-1 px-5 rounded mr-1`}></span>
                        <span >{color.color}</span>
                      </td>
                      <td className={`mt-6 text-white text-[14px] text-center`}>
                        <button onClick={() => changeStatus(color._id, !color.status)}
                          className={`${color.status === false
                            ? "bg-orange-500"
                            : "bg-blue-500 px-[10px]"
                            } rounded p-1`}
                        >
                          {color.status === true ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="border text-center">
                        <button onClick={() => deleteColor(color._id)}
                          className=" rounded text-ehite">
                          <span className="text-[red] text-2xl ">
                            <AiTwotoneDelete />
                          </span>
                        </button>
                      </td>
                      <td className="border text-center">
                        <Link to={`edit/${color._id}`}>
                          <button
                            className="pl-2">
                            <span className="text-[green] text-2xl">
                              <FaEdit />
                            </span>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ColorView;
