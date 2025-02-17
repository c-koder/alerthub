import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommunityViewModal from "../components/communityViewModal.component";
import CommunityCreateModal from "../components/communityCreateModal.component";
import { fetchCommunities } from "../redux/slices/community.slice";
import { DefaultImg } from "../utils/images";

const UserCommunities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { communities, loading } = useSelector((state) => state.community);

  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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

  const userCommunities = user.communities;

  const filteredCommunities =
    activeTab === 0
      ? userCommunities.filter((community) => community.manager !== user._id)
      : userCommunities.filter((community) => community.manager === user._id);

  return (
    <div className="relative min-h-screen flex flex-col">
      <section className="w-full xl:pt-32 lg:pt-20 pt-12 flex-grow">
        <div className="flex flex-col w-full max-w-6xl px-6 lg:px-0 mx-auto">
          <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
            <li>
              <button
                onClick={() => setActiveTab(0)}
                className={`flex w-full font-medium justify-center border-b-4 ${
                  activeTab === 0
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent"
                } hover:text-secondary-700 py-4`}
              >
                Joined Communities
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(1)}
                className={`flex w-full justify-center border-b-4 ${
                  activeTab === 1
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent"
                } hover:text-secondary-700 py-4`}
              >
                Your Communities
              </button>
            </li>
          </ul>
          <div className="mt-4">
            <p className="font-semibold text-sm">
              {filteredCommunities.length} Communities
            </p>
            <div className="container mx-auto max-h-[600px] sm:max-h-[500px] md:max-h-[400px] lg:max-h-[520px] overflow-y-auto mt-4 pe-4">
              <ul className="space-y-4">
                {filteredCommunities.map((community) => {
                  const isManager = community.manager === user._id;

                  return (
                    <li
                      key={community._id}
                      className="flex flex-col sm:flex-row items-center p-6 px-7 bg-white border border-gray-200 rounded-xl shadow-xs"
                    >
                      <Link to={`/communities/${community.code}`}>
                        <img
                          src={community.avatar || DefaultImg}
                          alt="Avatar"
                          className="w-16 h-16 rounded-full mr-4 border border-secondary-500/50 object-cover mb-4 sm:mb-0 cursor-pointer"
                        />
                      </Link>
                      <div className="sm:flex-1 text-center sm:text-left">
                        <Link to={`/communities/${community.code}`}>
                          <h3 className="font-semibold text-lg text-secondary-500 cursor-pointer">
                            {community.name}
                          </h3>
                        </Link>
                        <p className="text-sm font-semibold text-primary-800/50">
                          {community.location.city},{" "}
                          {community.location.district}
                        </p>
                      </div>
                      <div className="flex flex-col items-end text-sm font-medium text-primary-700 mt-4 sm:mt-0 sm:ml-4">
                        <div>{community.members.length} Members</div>
                        <div
                          className={`w-fit mt-2 border py-1 px-2 text-xs rounded-full font-medium ${
                            isManager
                              ? "text-green-600/70 bg-green-200/50 border-green-600/25"
                              : "text-gray-600/70 bg-gray-200 border-gray-600/25"
                          }`}
                        >
                          {isManager ? "Manager" : "Member"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
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

export default UserCommunities;
