import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { BellIcon } from "@heroicons/react/24/outline";

import io from "socket.io-client";

import {
  getNotifications,
  updateUserNotifications,
} from "../redux/slices/auth.slice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { user, notifications } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getNotifications());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) return;

    const socket = io("http://localhost:8080", {
      query: { userId: user._id },
    });

    socket.on("new_notification", (notif) => {
      dispatch(updateUserNotifications(notif));
    });

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative rounded-full bg-secondary-100 p-1 text-primary-500 hover:bg-secondary-200 focus:outline-none transition duration-200">
          <span className="absolute -inset-1.5 cursor-pointer" />
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="w-6 h-6" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-80 h-72 overflow-y-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none"
      >
        {notifications?.length > 0 ? (
          notifications?.map((notif, index) => (
            <MenuItem
              key={index}
              className={`p-4 hover:bg-primary-50 focus:bg-primary-100 cursor-pointer transition duration-200 ${
                index !== notifications.length - 1
                  ? "border-b border-b-primary-600/20"
                  : ""
              }`}
            >
              <div>
                <strong className="block text-sm font-semibold text-secondary-700/90">
                  {notif.title}
                </strong>
                <p className="text-xs text-gray-600">{notif.content}</p>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem as="div" className="p-3 text-center text-gray-500 text-sm">
            You have no new notifications.
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};

export default Notifications;
