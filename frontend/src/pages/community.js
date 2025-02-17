import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import {
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { fetchIncidents } from "../redux/slices/incident.slice";
import { fetchCommunityByCode } from "../redux/slices/community.slice";

import IncidentCreateModal from "../components/incidentCreateModal.component";
import Incident from "../components/incident.component";

const Community = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const [openCreate, setOpenCreate] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { community, loading } = useSelector((state) => state.community);
  const { incidents } = useSelector((state) => state.incident);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (code) {
      dispatch(fetchCommunityByCode(code));
      dispatch(fetchIncidents(code));
    } else {
      navigate("/communities");
    }
  }, [dispatch, code, navigate]);

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
        <div className="flex flex-col w-full max-w-3xl mx-auto bg-white border border-primary-500/25 rounded-2xl shadow-xs">
          <div className="flex flex-row gap-2 items-start border border-b-primary-500/25 bg-secondary-200/10 mb-2 p-6 rounded-tl-2xl rounded-tr-2xl">
            <Link to="/communities/my" className="cursor-pointer">
              <ArrowLeftCircleIcon
                width={32}
                className="cursor-pointer text-secondary-800/50"
              />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-secondary-800">
                {community?.name}
              </h1>
              <p className="text-md text-primary-800/50">
                {community?.description}
              </p>
            </div>
            <Menu as="div" className="relative ms-auto">
              <div>
                <MenuButton className="relative flex rounded-full text-sm outline-hidden">
                  <span className="absolute -inset-1.5 cursor-pointer w-fit" />
                  <span className="sr-only">Open community menu</span>
                  <EllipsisVerticalIcon
                    width={32}
                    className="cursor-pointer text-secondary-800/50"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <button
                    onClick={() => setOpenMembers(!openMembers)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Members
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                    Copy Link
                  </button>
                </MenuItem>
                {community?.manager !== user?._id && (
                  <MenuItem>
                    <button className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                      Leave
                    </button>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>

          {community?.members.find((e) => e._id === user._id) ||
          community?.manager === user._id ? (
            <div className="flex flex-col h-[600px]">
              <div className="overflow-y-auto flex-grow px-4">
                {incidents.length > 0 ? (
                  incidents?.map((incident, index) => (
                    <Incident key={index} data={incident} />
                  ))
                ) : (
                  <h4 className="text-md text-center font-semibold text-secondary-600 my-4">
                    No incidents yet!
                  </h4>
                )}
              </div>

              <div className="sticky bottom-0 w-full rounded-2xl bg-white px-4 pb-4 mt-4">
                <button
                  onClick={() => setOpenCreate(!openCreate)}
                  className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition duration-300"
                >
                  Report an Incident
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              You are not a member of this community.
            </p>
          )}
        </div>
      </section>
      <IncidentCreateModal
        open={openCreate}
        onClose={setOpenCreate}
        communityCode={community?.code}
      />
      <Dialog
        open={openMembers}
        onClose={() => setOpenMembers(!openMembers)}
        className="relative z-10"
      >
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
                    <h3 className="text-xl text-primary-600 font-bold">
                      Community Members
                    </h3>
                  </DialogTitle>
                  <div className="mt-2 text-center w-full">
                    <h4 className="text-md font-medium">
                      {community?.members.length} members
                    </h4>
                    <ul className="space-y-2 w-full mt-4">
                      {community?.members.map((member) => (
                        <li
                          key={member._id}
                          className="w-full flex items-center p-2 px-3 border border-gray-200 rounded-lg shadow-xs"
                        >
                          {member.username}
                          <div className="ms-auto text-right text-xs font-medium text-secondary-700">
                            {member.email}
                            <br />
                            {member.phoneNumber}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setOpenMembers(!openMembers)}
                  className="absolute top-2 right-2 w-6 h-6 text-secondary-700 bg-secondary-600/20 rounded-full"
                >
                  &times;
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Community;
