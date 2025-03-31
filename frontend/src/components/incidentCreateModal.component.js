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

import {
  createNewIncident,
  fetchIncidents,
} from "../redux/slices/incident.slice"; // Assuming incident slice exists

const IncidentCreateModal = ({ open, onClose, communityCode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { createLoading, createError, createSuccess, limit } = useSelector(
    (state) => state.incident // Assuming incident slice exists
  );

  const [formData, setFormData] = useState({
    title: "",
    category: "Theft", // Default category
    description: "",
    images: ["", "", ""], // Up to 3 image URLs
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const index = dataset.index;

    if (index !== undefined) {
      // If it's an image URL field, update the corresponding index in the images array
      const updatedImages = [...formData.images];
      updatedImages[index] = value;
      setFormData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const newIncident = {
      ...formData,
      user: user._id,
      code: communityCode,
    };
    dispatch(createNewIncident(newIncident));
  };

  useEffect(() => {
    if (createSuccess) {
      setFormData({
        title: "",
        category: "Theft",
        description: "",
        images: ["", "", ""],
      });
    }
  }, [createSuccess, dispatch, communityCode]);

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
                    Create a New Incident
                  </h3>
                </DialogTitle>
                <div className="mt-2 text-center">
                  <div className="mt-2">
                    <input
                      type="text"
                      name="title"
                      placeholder="Incident Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="border px-4 py-2 rounded-md w-full mb-4"
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="border px-4 py-2 rounded-md w-full mb-4"
                    >
                      <option value="Theft">Theft</option>
                      <option value="Lost Pet">Lost Pet</option>
                      <option value="Accident">Accident</option>
                      <option value="Vandalism">Vandalism</option>
                      <option value="Natural Disaster">Natural Disaster</option>
                      <option value="Missing Person">Missing Person</option>
                      <option value="Suspicious Activity">
                        Suspicious Activity
                      </option>
                    </select>
                    <textarea
                      name="description"
                      placeholder="Incident Description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={8}
                      className="border px-4 py-2 rounded-md w-full mb-4 resize-none"
                    />
                    <div className="flex flex-col gap-4">
                      {formData.images.map((image, index) => (
                        <input
                          key={index}
                          type="text"
                          name={`image${index}`}
                          data-index={index}
                          value={image}
                          onChange={handleChange}
                          placeholder={`Image URL #${index + 1} (Optional)`}
                          className="border px-4 py-2 rounded-md w-full"
                        />
                      ))}
                    </div>
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
                      Create Incident
                    </button>
                  </div>
                  {(createError || createSuccess) && (
                    <Alert
                      error={createError}
                      success={createSuccess}
                      title={
                        createError
                          ? "An error occurred:"
                          : createSuccess && "Success!"
                      }
                      data={
                        createError ||
                        (createSuccess && "Incident successfully created.")
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

export default IncidentCreateModal;
