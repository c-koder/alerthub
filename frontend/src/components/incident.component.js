import { useState } from "react";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import Slider from "react-slick";
import moment from "moment";

import { DefaultImg } from "../utils/images";

const Incident = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const settings = {
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ChevronRightIcon fill="#832AFF" />,
    prevArrow: <ChevronLeftIcon fill="#832AFF" />,
  };

  const validImages = data.images?.filter((img) => img !== "");

  return (
    <div className="flex flex-col items-start space-y-2 p-4 my-4 rounded-lg bg-dark-200/5 text-gray-700 w-full">
      <h4 className="text-md font-semibold text-primary-600">{data.title}</h4>
      <h5 className="text-xs font-medium text-secondary-800/80 bg-secondary-400/50 p-1 px-2 rounded w-fit my-1">
        {data.category}
      </h5>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full bg-dark-100/20 flex items-center justify-center">
          <span className="text-white text-xs font-semibold">
            {data.user.username[0].toUpperCase()}
          </span>
        </div>
        <span className="text-secondary text-xs font-bold">
          {data.user.username}
        </span>
        <span className="text-xs font-semibold text-secondary-800/75">
          {moment(data.createdAt).fromNow()}
        </span>
      </div>
      <div className="w-full border-t border-dark-400/10"></div>
      <p className="text-md text-dark-500 mb-0">{data.description}</p>
      {data.images?.length > 0 && (
        <div className="my-3 flex gap-3">
          {validImages.map((img, idx) => (
            <img
              key={idx}
              src={img || DefaultImg}
              alt="Incident"
              className="w-24 h-24 object-cover rounded-lg shadow-sm cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          ))}
        </div>
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-0">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <Slider {...settings}>
                {validImages.map((img, idx) => (
                  <div key={idx} className="h-[460px] overflow-hidden -mb-2">
                    <img
                      src={img || DefaultImg}
                      alt="Incident"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-2 right-2 w-6 h-6 text-white bg-dark-600/80 rounded-full"
              >
                &times;
              </button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Incident;
