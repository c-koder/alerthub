import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import Slider from "react-slick";

import { useDispatch } from "react-redux";

import { DefaultImg } from "../utils/images";

import { setActiveCommunity } from "../redux/slices/community.slice";

const Community = ({ d, open, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center hover:-translate-y-1 mx-3 rounded-xl py-6 px-4 transition-all duration-400 focus:outline-none">
      <button
        className="w-32 h-32 rounded-full overflow-hidden"
        onClick={() => {
          dispatch(setActiveCommunity(d._id));
          onClose(!open);
        }}
      >
        <img
          className="object-cover w-full h-full cursor-pointer"
          src={d.avatar || DefaultImg}
          alt={d.name}
        />
      </button>
      <button
        className="text-center mt-4 font-semibold text-secondary-500"
        onClick={() => {
          dispatch(setActiveCommunity(d._id));
          onClose(!open);
        }}
      >
        <h3 className="cursor-pointer">{d.name}</h3>
      </button>
    </div>
  );
};

const CommunitySlider = ({ data, open, onClose }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: data.length > 5 ? 5 : data.length,
    slidesToScroll: data.length > 5 ? 5 : data.length,
    nextArrow: <ChevronRightIcon fill="#832AFF" />,
    prevArrow: <ChevronLeftIcon fill="#832AFF" />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map
        ? data.map((d) => (
            <Community key={d._id} d={d} open={open} onClose={onClose} />
          ))
        : "No communities found"}
    </Slider>
  );
};

export default CommunitySlider;
