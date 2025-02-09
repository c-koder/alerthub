import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { DefaultImg } from "../utils/images";

import { joinExistingCommunity } from "../redux/slices/community.slice";
import Alert from "./alert.component";

const CommunityModal = ({ communities, open, onClose }) => {
  const dispatch = useDispatch();

  const { activeCommunityId, joinLoading, joinError, joinSuccess } =
    useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  const activeCommunity = communities.find((c) => c._id === activeCommunityId);

  const handleJoin = () => {
    dispatch(joinExistingCommunity({ communityId: activeCommunityId }));
  };

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
                  <div className="w-48 h-48 rounded-full overflow-hidden mb-4 mx-auto">
                    <img
                      className="object-cover w-full h-full"
                      src={activeCommunity?.avatar || DefaultImg}
                      alt={activeCommunity?.name}
                    />
                  </div>
                  <h3 className="text-2xl text-primary-600 font-bold">
                    {activeCommunity?.name}
                  </h3>
                </DialogTitle>
                <div className="mt-2 text-center">
                  <h5 className="text-md">
                    {activeCommunity?.location.city},{" "}
                    {activeCommunity?.location.district}
                  </h5>
                  <h4 className="text-md font-medium">
                    {activeCommunity?.members.length} members
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">
                    {activeCommunity?.description}
                  </p>
                  <div className="flex gap-4 mt-6 mb-4">
                    <button
                      type="button"
                      data-autofocus
                      disabled={joinLoading}
                      onClick={() => onClose(false)}
                      className="flex w-36 justify-center rounded-md border-2 border-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-primary-600 shadow-xs"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                      onClick={handleJoin}
                      disabled={
                        user?.communities?.includes(activeCommunityId) ||
                        joinLoading
                      }
                    >
                      {user?.communities?.includes(activeCommunityId)
                        ? "Already Joined"
                        : "Join Now"}
                    </button>
                  </div>
                  {(joinError || joinSuccess) && (
                    <Alert
                      error={joinError}
                      success={joinSuccess}
                      title={
                        joinError
                          ? "An error occured:"
                          : joinSuccess && "Success!"
                      }
                      data={
                        joinError ||
                        (joinSuccess &&
                          "You have joined, welcome to the community")
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

export default CommunityModal;
