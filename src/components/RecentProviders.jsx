import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdPending, MdVerified } from "react-icons/md";
import { TbMapPinPin } from "react-icons/tb";
import { useAppContext } from "../context/appContext";

const RecentProviders = () => {
  const { getRecentProviders, recentProviders, isLoading } = useAppContext();

  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedRecent = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const handleClosedModal = () => {
    setIsModalOpen(false);
    setModalContent(false);
  };

  useEffect(() => {
    getRecentProviders();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full grid items-center justify-center">
        <div className="flex flex-col  items-center justify-center">
          <div className="h-8 w-8 animate-bounce bg-yellow-300 rounded-full" />
          <h4 className="animate-pulse text-sm font-semibold">loading please wait...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {recentProviders && !isLoading ? (
        recentProviders.map((provider) => (
          <div
            onClick={() => selectedRecent(provider)}
            key={provider._id}
            className="border border-gray-400 rounded-lg p-3 cursor-pointer hover:bg-yellow-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 text-xl leading-6 truncate capitalize">
                {provider.fullName}{" "}
              </h3>
              <div className="flex items-center gap-3">
                {provider.verified ? (
                  <span className="text-green-500 text-base">
                    <MdVerified />
                  </span>
                ) : (
                  <span className="text-blue-500 text-base">
                    <MdPending />
                  </span>
                )}
              </div>
            </div>
            <hr className="my-3" />
            {/*  */}
            <div>
              <p>
                Registered Category: <span className="capitalize">{provider.categoryId.categoryTitle}</span>
              </p>
              <p>Specialty: {provider.speciality}</p>
              <p>Hourly Rate: {provider.price} USD</p>
            </div>
          </div>
        ))
      ) : (
        <div className="grid justify-center py-5">
          <p>No providers found for today</p>
        </div>
      )}

      {/* modal content */}
      {isModalOpen && (
        <div className="bg-black/60 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0">
          <div className="bg-white m-4 md:m-0 md:max-w-4xl w-full rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-semibold leading-7 capitalize">{modalContent.fullName}</h3>
                <h4 className="text-3xl text-yellow-400 font-semibold leading-7">{modalContent.price} per/hr</h4>
              </div>

              <button onClick={() => handleClosedModal()} className="text-red-500">
                <IoIosCloseCircle size={34} />
              </button>
            </div>
            <hr className="my-3" />
            {/* content */}

            {/* details */}
            <div className="my-3">
              <h3 className="text-2xl font-semibold">Artisan Details</h3>
              <div className={`${!modalContent.address ? "grid grid-cols-5 gap-4" : ""}`}>
                {modalContent.address ? (
                  <div>
                    <p>Location: {modalContent.address}</p>
                  </div>
                ) : (
                  <div className="col-span-2 bg-black rounded-md p-2 h-[250px] w-full flex items-center justify-center">
                    <TbMapPinPin size={34} color="white" />
                  </div>
                )}
                <div className="col-span-3 flex flex-col gap-2 text-base font-semibold">
                  <p>Email: {modalContent.email}</p>
                  <p>Email: {modalContent.phone}</p>
                  <p>Member since: {moment(modalContent.createdAt).fromNow()}</p>
                  <p>Bio: {modalContent.bio ? modalContent.bio : "N/A"}</p>
                  <p>Status: {modalContent.verified ? "Verified" : "Unverified"}</p>
                  <p>Registered Category: {modalContent.categoryId.categoryTitle}</p>
                  <p>Specialty: {modalContent.speciality}</p>
                </div>
              </div>
            </div>
            {/* content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProviders;
