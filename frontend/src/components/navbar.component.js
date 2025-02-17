import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Logo } from "../utils/images";

import { signoutUser } from "../redux/slices/auth.slice";
import Notifications from "./notifications.component";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutUser());
  };

  return (
    <Disclosure
      as="nav"
      className="fixed w-full top-0 bg-white border-b border-gray-200 shadow-xs z-10"
    >
      <div className="mx-auto max-w-6xl sm:px-0 md:px-4 px-6">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start sm:px-0 px-3">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Alert Hub"
                  src={Logo}
                  className="h-6 sm:h-9 w-auto cursor-pointer"
                />
              </Link>
            </div>
            <div className="w-1/2 sm:w-full flex justify-center px-4 lg:px-8">
              <div className="relative w-full max-w-3xl">
                <label htmlFor="Search" className="sr-only">
                  Search
                </label>

                <input
                  type="text"
                  id="Search"
                  placeholder="Search community by name..."
                  className="w-full cursor-text rounded-md border border-gray-200 py-2.5 ps-4 shadow-xs sm:text-sm outline-0"
                />

                <Link
                  className="absolute inset-y-2.5 end-12 w-100 hidden sm:flex place-content-center font-medium text-sm underline text-primary-500"
                  to="/communities"
                >
                  See All
                </Link>

                <span className="absolute hidden sm:block inset-y-0 end-0 w-10 place-content-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!user && (
              <Link to="/signin">
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Signin
                </button>
              </Link>
            )}
            {user && <Notifications />}
            {user && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative rounded-full bg-secondary-400 p-1 text-secondary-100 hover:bg-secondary-600 focus:outline-none transition duration-200">
                    <span className="absolute -inset-1.5 cursor-pointer" />
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon
                      aria-hidden="true"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/communities/my"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Communities
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleSignout}
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
