import React, { useContext, useState } from 'react'
import axios from "axios"
import { Context } from '../../../MainContext';

function AdminRegister() {

    const [toggle, setToggle] = useState(false);

    const { apiBaseUrl, adminBaseUrl, notify } = useContext(Context);

    function formHandler(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const re_password = form.re_password.value;
        if (name !== "" && email !== "" && password !== "" && re_password !== "") {
            if (password === re_password) {
                axios.post(apiBaseUrl + adminBaseUrl + `/admin-signup`, { name, email, password })
                    .then(
                        (success) => {
                            if (success.data.status === 1) {
                                form.reset();
                                notify(success.data.msg, "success");
                            } else {
                                notify(success.data.msg, "error");
                            }
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                        }
                    )
            } else {
                console.log("Password Must Match");
            }
        } else {
            console.log("Fill All Fields");
        }
    }

    return (
        <div className="shadow h-full">
            <div className="text-2xl font-bold opacity-80 py-2 px-3">
                Admin / Register <hr className="mt-2" />
            </div>

            <form onSubmit={formHandler} className="p-4" encType="multipart/form-data">
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type={`${toggle === false ? "password" : "text"}`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Re-enter Password
                        </label>
                        <input
                            name="re_password"
                            type={`${toggle === false ? "password" : "text"}`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6 flex pb-2 items-end">
                        <button onClick={() => { setToggle(!toggle) }}>
                            <span className={` ${toggle === false ? "bg-[#21357eea]" : "bg-[#d23232d9]"}  px-4 p-2 rounded-xl text-white`}>
                                {toggle === false ? "Show Password" : "Hide Password"}
                            </span>
                        </button>
                    </div>
                </div>
                <button
                    typeof="submit"
                >
                    <span className="bg-[#21357e] px-4 p-2 rounded-xl text-white">Submit</span>
                </button>
            </form>
        </div>
    )
}

export default AdminRegister