import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../MainContext";

function Signup() {

  const { apiBaseUrl, userBaseUrl } = useContext(Context);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);
    // Regular expression for a basic phone number validation
    const phoneRegex = /^\d{10}$/;
    // Check if the input value matches the regex pattern
    setIsValidPhoneNumber(phoneRegex.test(inputValue));
  };

  const signupHandler = (event) => {
    setMsg("");
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const contact = event.target.contact.value
    const password = event.target.password.value;
    const confirm_password = event.target.confirm_password.value;

    if (name !== "" && email !== "" && password !== "" && confirm_password !== "" && contact !== "") {
      if (password === confirm_password) {
        // if (isStrongPassword(password)) {
        if (isValidPhoneNumber) {
          axios.post(apiBaseUrl + userBaseUrl + "/create-account", { name, email, contact, password })
            .then(
              (success) => {
                if (success.data.status === 1) {
                  event.target.reset();
                  setMsg(success.data.msg);
                  setError(false);
                  setPhoneNumber('');
                } else {
                  console.log(success.data.error);
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
          setMsg("Please enter a valid phone number.");
          setError(true);
        }
        // } else {
        //   setMsg("Minimum 8 Charactor = (Hint -> Strong@123) one uppercase, one lowercase letter, one digit, special character")
        //   setError(true);
        // }
      } else {
        setMsg("Both Password Must Match");
        setError(true);
      }
    } else {
      setMsg("Please Fill All Fields");
      setError(true);
    }
  }

  return (
    <section className="banner-mobile w-full h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className={`${error ? 'text-red-500' : 'text-green-500'} text-center font-bold`}>
              {msg}
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={signupHandler}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required=""
                />
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+91"
                  required=""
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                {/* {!isValidPhoneNumber && (
                  <p style={{ color: 'red' }}>Please enter a valid phone number.</p>
                )} */}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm_password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <Link
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to={"/login"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;


function isStrongPassword(password) {
  // Define the criteria for a strong password
  const minLength = 8; // Minimum length
  const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
  const hasNumbers = /\d/.test(password); // At least one digit
  const hasSpecialChars = /[!@#$%^&*]/.test(password); // At least one special character

  // Check if the password meets all the criteria
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumbers &&
    hasSpecialChars
  );
}

// Example usage
// const password = "Strong@123";
// if (isStrongPassword(password)) {
//   console.log("Password is strong!");
// } else {
//   console.log("Password is weak. Please choose a stronger password.");
// }