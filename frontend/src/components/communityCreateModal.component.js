import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Alert from "./alert.component";

import { createNewCommunity } from "../redux/slices/community.slice";

const CommunityCreateModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { createLoading, createError, createSuccess } = useSelector(
    (state) => state.community
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    avatar: "",
    city: "",
    district: "",
    isPublic: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newCommunity = {
      ...formData,
      manager: user._id,
    };
    dispatch(createNewCommunity(newCommunity));
  };

  useEffect(() => {
    if (createSuccess) {
      setFormData({
        name: "",
        description: "",
        code: "",
        avatar: "",
        city: "",
        district: "",
      });
    }
  }, [createSuccess, navigate]);

  useEffect(() => {
    console.log(createError);
  }, [createError]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-10">
              <div className="flex flex-col items-center justify-center">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900 text-center"
                >
                  <h3 className="text-2xl text-primary-600 font-bold">
                    Create a New Community
                  </h3>
                </DialogTitle>
                <div className="mt-2 text-center">
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Community Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border px-4 py-2 rounded-md w-full mb-4"
                    />
                    <input
                      type="text"
                      name="avatar"
                      placeholder="Avatar URL (Optional)"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="border px-4 py-2 rounded-md w-full mb-4"
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={8}
                      className="border px-4 py-2 rounded-md w-full mb-4 resize-none"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="border px-4 py-2 rounded-md w-full mb-4"
                    />
                    <input
                      type="text"
                      name="district"
                      placeholder="District"
                      value={formData.district}
                      onChange={handleChange}
                      className="border px-4 py-2 rounded-md w-full mb-4"
                    />
                  </div>
                  <div className="flex gap-4 mt-6 mb-4">
                    <button
                      type="button"
                      disabled={createLoading}
                      onClick={() => onClose(false)}
                      className="flex w-36 justify-center rounded-md border-2 border-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-primary-600 shadow-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={createLoading}
                      className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500"
                    >
                      Create Community
                    </button>
                  </div>
                  {(createError || createSuccess) && (
                    <Alert
                      error={createError}
                      success={createSuccess}
                      title={
                        createError
                          ? "An error occured:"
                          : createSuccess && "Success!"
                      }
                      data={
                        createError ||
                        (createSuccess && "Community successfully created.")
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CommunityCreateModal;
