import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import ProfileTab from '../components/ProfileTab'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { Context } from '../../../MainContext';
import { login } from '../../../Reducers/User';

function Profile() {

    const { notify } = useContext(Context);

    const [localUser, setLocalUser] = useState({});

    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(
        () => {
            setLocalUser(user);
        },
        [user]
    )

    const updateProfile = () => {
        if (user !== null) {
            axios.patch('http://localhost:5000/user/update-profile', localUser)
                .then(
                    (success) => {
                        if (success.data.status === 1) {
                            notify(success.data.msg, "success");
                            dispatch(login({ user: localUser }));
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }

    return (
        <Container>
            <ProfileTab />
            <div className="shadow h-full">
                <div className="p-4" encType="multipart/form-data">
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input onChange={
                            (ev) => {
                                setLocalUser({
                                    ...localUser,
                                    name: ev.target.value
                                })
                            }
                        }
                            value={localUser?.name}
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
                            value={localUser?.email}
                            readOnly
                            name="email"
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="contact"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Contact
                        </label>
                        <input onChange={
                            (ev) => {
                                setLocalUser({
                                    ...localUser,
                                    contact: ev.target.value
                                })
                            }
                        }
                            value={localUser?.contact}
                            name="contact"
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                        <textarea onChange={
                            (ev) => {
                                setLocalUser({
                                    ...localUser,
                                    address: ev.target.value
                                })
                            }
                        }
                            value={localUser?.address} id="address" rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add your address...">
                        </textarea>
                    </div>
                    <button onClick={updateProfile}
                        typeof="button"
                    >
                        <span className="bg-[#21357e] px-4 p-2 rounded-xl text-white">Update</span>
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default Profile