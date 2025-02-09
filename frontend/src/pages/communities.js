import { useEffect, useState } from "react";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CommunitySlider from "../components/communitySlider.component";
import CommunityViewModal from "../components/communityViewModal.component";

import { fetchCommunities } from "../redux/slices/community.slice";
import CommunityCreateModal from "../components/communityCreateModal.component";

const Communities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { communities, loading } = useSelector((state) => state.community);

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="relative flex size-6">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex size-6 rounded-full bg-primary-500"></span>
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <section className="w-full xl:pt-32 lg:pt-20 pt-12 flex-grow">
        <div className="flex flex-col w-full max-w-6xl px-6 lg:px-0 mx-auto">
          <h1 className="text-2xl text-center font-semibold text-secondary-700 mb-24">
            Communities Near Me
          </h1>
          <CommunitySlider data={communities} open={open} onClose={setOpen} />
        </div>
      </section>
      <section>
        <div className="lg:px-20 p-12 rounded-xl rounded-bl-none rounded-br-none bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-between flex-col lg:flex-row">
          <div className="block text-center mb-5 lg:text-left lg:mb-0">
            <h2 className="font-manrope text-3xl text-white font-semibold mb-5 lg:mb-2">
              Don't have a community yet?
            </h2>
            <p className="text-md text-primary-100">
              Create or join a community to stay alert around you!
            </p>
          </div>
          <div className="flex lg:flex-col gap-4 sm:items-end">
            <Link to="/communities/my">
              <button className="flex gap-2 bg-white rounded-md shadow-sm text-md text-center text-primary-600 font-semibold py-3 px-6 transition-all duration-400 hover:translate-x-1">
                My Communities
                <ArrowRightIcon width={24} />
              </button>
            </Link>
            <button
              onClick={() => setOpenCreate(!openCreate)}
              className="flex items-center gap-2 border-2 border-light-200 rounded-md shadow-sm text-md text-center text-light-200 font-semibold py-3 px-6 transition-all duration-400 hover:translate-x-1"
            >
              Create a New Community
              <ArrowRightIcon width={24} />
            </button>
          </div>
        </div>
      </section>
      <CommunityViewModal
        communities={communities}
        open={open}
        onClose={setOpen}
      />
      <CommunityCreateModal open={openCreate} onClose={setOpenCreate} />
    </div>
  );
};

export default Communities;
