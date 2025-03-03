import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import io from "socket.io-client";
import moment from "moment";
import { toast } from "react-toastify";

import {
  getNotifications,
  updateUserNotifications,
  markNotificationsAsRead,
} from "../redux/slices/auth.slice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { user, notifications } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const hasUnreadNotifications = notifications?.some((notif) => !notif.read);

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

    socket.on("new_notification", (newNotif) => {
      dispatch(updateUserNotifications({ ...newNotif, read: false }));
      toast.info(<ToastNotif content={newNotif.content} />);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    if (menuOpen) {
      dispatch(markNotificationsAsRead());
    }
  }, [menuOpen, dispatch]);

  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => {
        if (open !== menuOpen) {
          setMenuOpen(open);
        }

        return (
          <>
            <div>
              <MenuButton className="relative rounded-full bg-secondary-100 p-1 text-primary-500 hover:bg-secondary-200 focus:outline-none transition duration-200">
                <span className="absolute -inset-1.5 cursor-pointer" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="w-6 h-6" />
                {hasUnreadNotifications && (
                  <span className="absolute top-1 right-1.5 h-2.5 w-2.5 bg-red-600 rounded-full animate-pulse"></span>
                )}
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-80 h-72 overflow-y-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none"
            >
              {notifications?.length > 0 ? (
                notifications.map((notif, index) => (
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
                      <p className="text-xs font-medium text-gray-600 my-0">
                        {notif.content}
                      </p>
                      <p className="text-xs text-gray-700/50 font-medium mt-0.5">
                        {moment(notif.createdAt).fromNow()}
                      </p>
                    </div>
                  </MenuItem>
                ))
              ) : (
                <MenuItem
                  as="div"
                  className="p-3 text-center text-gray-500 text-sm"
                >
                  You have no new notifications.
                </MenuItem>
              )}
            </MenuItems>
          </>
        );
      }}
    </Menu>
  );
};

const ToastNotif = ({ content }) => {
  return (
    <div>
      <h3 className="font-semibold text-xs">NEW INCIDENT</h3>
      <p className="text-sm mt-1.5">{content}</p>
    </div>
  );
};

export default Notifications;
