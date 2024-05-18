import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdWorkOutline } from "react-icons/md";
import { TbMapPinPin } from "react-icons/tb";
import Wrapper from "../components/Wrapper";
import { useAppContext } from "../context/appContext";

const Providers = () => {
  const { getProviderList, providerList, isLoading } = useAppContext();
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProviderList();
  }, []);

  const convertToFiveStarRating = (rating) => {
    if (rating < 0 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const roundedRating = Math.round(rating);
    const stars = "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);

    return stars;
  };

  const selectedRecent = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const handleClosedModal = () => {
    setIsModalOpen(false);
    setModalContent(false);
  };

  return (
    <Wrapper>
      <div className="flex flex-col h-full pb-8">
        <div className="p-2 md:p-6">
          <h3 className=" text-2xl font-semibold text-gray-700">Providers</h3>
        </div>
        <section className="px-2 md:px-6 mt-4">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className=" flex flex-col items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-yellow-300 animate-bounce"></div>
                <p className="animate-pulse text-xl font-semibold text-gray-800">Please wait loading...</p>
              </div>
            </div>
          ) : providerList.length > 0 ? (
            providerList.map((provider) => (
              <div
                onClick={() => selectedRecent(provider)}
                key={provider._id}
                className="border border-slate-300 p-2 md:p-6 rounded-md cursor-pointer hover:bg-gray-100 mb-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="truncate font-semibold text-2xl text-gray-700">
                      {provider.fullName}{" "}
                      <span className="text-sm font-bold text-green-500">/ {provider.price} USD per hr</span>
                    </p>

                    <div className=" text-sm font-semibold text-gray-700">
                      {provider.verified ? (
                        <span className="text-teal-500 font-semibold">Verified</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Unverified</span>
                      )}
                      <span className="flex items-center gap-1">
                        <MdWorkOutline />
                        {provider.categoryId.categoryTitle}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className=" text-sm font-semibold text-gray-700">Member since</p>
                    <p className=" text-sm font-semibold text-gray-700">{moment(provider.createdAt).fromNow()}</p>
                  </div>
                </div>
                <hr className="border-slate-300 my-2" />
                <div className="grid grid-cols-4 gap-1">
                  <div>
                    <p className="truncate text-sm font-semibold text-gray-700">Address:</p>
                    <p className="truncate text-sm font-semibold text-gray-700">
                      {provider.address ? provider.address : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="truncate text-sm font-semibold text-gray-700">Email:</p>
                    <p className="truncate text-sm font-semibold text-gray-700">{provider.email}</p>
                  </div>
                  <div>
                    <p className="truncate text-sm font-semibold text-gray-700">Phone:</p>
                    <p className="truncate text-sm font-semibold text-gray-700">{provider.phone}</p>
                  </div>
                  <div className="text-end grid grid-cols-2">
                    <div>
                      <p className="truncate text-sm font-semibold text-gray-700">Ratings:</p>
                      <p className="truncate text-sm font-semibold text-gray-700">
                        {convertToFiveStarRating(provider.rating)}
                      </p>
                    </div>
                    <div>
                      <p className="truncate text-sm font-semibold text-gray-700">Total Jobs:</p>
                      <p className="truncate text-sm font-semibold text-gray-700"> {provider.jobsComplete}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div> no providers found....</div>
          )}
        </section>
      </div>
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
            <div className="flex justify-end items-center gap-4 border-t pt-3">
              <p className="font-semibold">
                Provider is currently {modalContent.verified ? "Verified" : "Block"}, their account
              </p>
              <button
                className={` px-4 py-2 rounded-md font-semibold ${
                  !modalContent.verified ? "bg-green-500 text-gray-800" : "bg-red-500 text-white font-semibold"
                }`}
              >
                {!modalContent.verified ? "Verify / Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Providers;
