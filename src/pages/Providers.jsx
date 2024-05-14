import moment from "moment";
import React, { useEffect } from "react";
import { MdWorkOutline } from "react-icons/md";
import Wrapper from "../components/Wrapper";
import { useAppContext } from "../context/appContext";

const Providers = () => {
  const { getProviderList, providerList, isLoading } = useAppContext();

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
    </Wrapper>
  );
};

export default Providers;
