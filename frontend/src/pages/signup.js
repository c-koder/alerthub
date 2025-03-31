import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Logo } from "../utils/images";

import { signupUser } from "../redux/slices/auth.slice";
import Alert from "../components/alert.component";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    city: "",
    district: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, signupError, signupSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    dispatch(signupUser(formData));
  };

  useEffect(() => {
    setFormData({
      username: "",
      phoneNumber: "",
      city: "",
      district: "",
      email: "",
      password: "",
    });
  }, [signupSuccess]);

  return (
    <div className="flex max-w-md m-auto min-h-screen flex-1 flex-col items-center justify-center my-12">
      <div className="w-full justify-center px-6 py-12 lg:px-8 border border-gray-300 rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Alert Hub" src={Logo} className="mx-auto h-12 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter a username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-0 border border-gray-300 placeholder:text-gray-400 focus:border-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phonenumber"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-0 border border-gray-300 placeholder:text-gray-400 focus:border-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-0 border border-gray-300 placeholder:text-gray-400 focus:border-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="district"
                className="block text-sm/6 font-medium text-gray-900"
              >
                District
              </label>
              <div className="mt-2">
                <input
                  id="district"
                  name="district"
                  type="text"
                  required
                  placeholder="Enter your district"
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-0 border border-gray-300 placeholder:text-gray-400 focus:border-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-0 border border-gray-300 placeholder:text-gray-400 focus:border-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-0 border border-gray-300 placeholder:text-gray-400 focus:border-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mb-4"
              >
                {loading && (
                  <svg
                    className="text-gray-300 animate-spin me-2 mt-1"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-gray-900"
                    ></path>
                  </svg>
                )}
                Sign up
              </button>
              {(signupError || signupSuccess) && (
                <Alert
                  error={signupError}
                  success={signupSuccess}
                  title={
                    signupError
                      ? "An error occured:"
                      : signupSuccess && "Success!"
                  }
                  data={
                    signupError ||
                    (signupSuccess && "User registered successfully.")
                  }
                />
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <Link
              to="/signin"
              className="font-semibold text-primary-600 hover:text-primary-500"
            >
              Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
