import React, { useContext, useState } from 'react'
import Container from '../components/Container'
import ProfileTab from '../components/ProfileTab'
import axios from 'axios';
import { Context } from '../../../MainContext';
import { useSelector } from 'react-redux';

function PasswordChange() {

  const { apiBaseUrl, userBaseUrl, notify } = useContext(Context);

  const { user } = useSelector(store => store.user);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const passwordHandler = (event) => {
    setError(false)
    setMsg("")
    event.preventDefault();
    const old_password = event.target.old_password.value;
    const new_password = event.target.new_password.value;
    const confirm_newPassword = event.target.confirm_newPassword.value;
    if (old_password !== "" && new_password !== "" && confirm_newPassword !== "") {
      if (new_password === confirm_newPassword) {
        // if (old_password === user.password) {
        if (user !== null) {
          axios.patch(apiBaseUrl + userBaseUrl + `/change-password/${user.email}`, { new_password, old_password })
            .then(
              (success) => {
                if (success.data.status === 1) {
                  event.target.reset();
                  notify(success.data.msg, "success");
                  setError(false);
                } else {
                  setMsg(success.data.msg);
                  setError(true);
                }
              }
            ).catch(
              (error) => {
                console.log(error);
              }
            )
        }
        // } else {
        //   console.log("Your Old Password Must Match");
        // }
      } else {
        setMsg("Password Must Match");
        setError(true);
      }
    } else {
      setMsg("Please Fill All Fields");
      setError(true);
    }
  }

  return (
    <Container>
      <ProfileTab />
      <div className="bg-gradient-to-r mt-10 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full">
          {
            error === true
              ?
              <div className={`text-center font-bold ${error === false ? "text-green-500" : "text-red-500"} `}>{msg}</div>
              :
              ""
          }
          <form onSubmit={passwordHandler}
            action="#" method="post" className="space-y-4">
            {/* Old Password */}
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-600">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                name="old_password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500
                                       transition duration-300 ease-in-out transform focus:scale-105"
              />
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-600">New Password</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500
                                       transition duration-300 ease-in-out transform focus:scale-105"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">Confirm New Password</label>
              <input
                type="text"
                id="confirmPassword"
                name="confirm_newPassword"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500
                                       transition duration-300 ease-in-out transform focus:scale-105"
              />
            </div>

            {/* Submit Button */}
            <button
              typeof='button'
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md 
                                   transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline-blue"

            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default PasswordChange