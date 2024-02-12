import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../../MainContext";

function Admins() {

    const { apiBaseUrl, adminBaseUrl } = useContext(Context);

    const [admins, setAdmins] = useState([]);

    useEffect(
        () => {
            axios.get(apiBaseUrl + adminBaseUrl)
                .then(
                    (success) => {
                        if (success.data.status === 1) {
                            setAdmins(success.data.admins);
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        },
        [admins]
    )

    const adminDelete = (id) => {
        axios.delete(apiBaseUrl + adminBaseUrl + `/delete/${id}`)
            .then(
                (success) => {
                    console.log(success);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <>
            <div className="text-2xl font-bold opacity-80 py-2 px-3">
                Users <hr className="mt-2" />
            </div>
            <div className="text-gray-900 bg-gray-200">

                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">Name</th>
                                <th className="text-left p-3 px-5">Email</th>
                                <th />
                            </tr>
                            {
                                admins.map(
                                    (user, index) => {
                                        return (
                                            <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                                                <td className="p-3 px-5">
                                                    {user?.name}
                                                </td>
                                                <td className="p-3 px-5">
                                                    {user?.email}
                                                    {/* <input
                                                        type="text"
                                                        value={user?.email}
                                                        // defaultValue={user?.email}
                                                        className="bg-transparent"
                                                    /> */}
                                                </td>
                                                <td className="p-3 px-5 flex justify-end">
                                                    <button onClick={() => { adminDelete(user?._id) }}
                                                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Admins;