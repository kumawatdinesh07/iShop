import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../MainContext";
import { login } from "../../../Reducers/User";
import { useDispatch, useSelector } from "react-redux";

function Login() {

  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const { apiBaseUrl, userBaseUrl, cartBaseUrl } = useContext(Context);
  const { cart } = useSelector(store => store.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (event) => {

    setMsg("");
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email !== "" && password !== "") {
      axios.post(apiBaseUrl + userBaseUrl + "/login-account", { email, password })
        .then(
          (success) => {
            if (success.data.status === 1) {
              const userData = success.data.user;
              axios.post(apiBaseUrl + cartBaseUrl + `/move-to-cart/${success.data.user._id}`, cart)
                .then(
                  (success) => {
                    if (success.data.status === 1) {
                      dispatch(login({ user: userData }));
                      event.target.reset();
                      navigate("/");
                    } else {
                      console.log();
                    }
                  }
                ).catch(
                  (error) => {
                    console.log(error);
                  }
                )
            } else {
              setMsg(success.data.msg);
              setError(true);
            }
          }
        ).catch(
          (error) => {
            setMsg(error.data.msg);
            setError(true);
          }
        )
    } else {
      setMsg("Please Fill All Fields");
      setError(true);
    }
  }


  return (

    <section className="banner-mobile h-[100vh] dark:bg-gray-900">
      <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className={`font-bold text-center ${error ? "text-red-600" : "text-green-600"}`}>
              {msg}
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={loginHandler}
              className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to={"/signup"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
