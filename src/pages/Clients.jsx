import moment from "moment";
import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";

const Clients = () => {
  const { getClientList, clientList, isLoading } = useAppContext();

  useEffect(() => {
    getClientList();
  }, []);

  return (
    <div className="flex flex-col h-full pb-8">
      <div className="p-2 md:p-6">
        <h3 className=" text-2xl font-semibold text-gray-700">Clients</h3>
      </div>
      {/*  */}
      <section className="px-2 md:px-6 mt-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className=" flex flex-col items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-yellow-300 animate-bounce"></div>
              <p className="animate-pulse text-xl font-semibold text-gray-800">Please wait loading...</p>
            </div>
          </div>
        ) : clientList.length > 0 ? (
          clientList.map((client) => (
            <div
              key={client._id}
              className="border border-slate-300 p-2 md:p-6 rounded-md cursor-pointer hover:bg-gray-100 mb-3"
            >
              <div className="flex items-center justify-between ">
                <div>
                  <p className="truncate font-semibold text-2xl text-gray-700">{client.fullName}</p>
                  <p className="truncate text-sm font-semibold text-gray-700">
                    {client.verified ? (
                      <span className="text-teal-500 font-semibold">Verified</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Unverified</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className=" text-sm font-semibold text-gray-700">Member since</p>
                  <p className=" text-sm font-semibold text-gray-700">{moment(client.createdAt).fromNow()}</p>
                </div>
              </div>
              <hr className="border-slate-300 my-2" />
              <div className="grid grid-cols-4 gap-1">
                <div>
                  <p className="truncate text-sm font-semibold text-gray-700">Address:</p>
                  <p className="truncate text-sm font-semibold text-gray-700">
                    {client.address ? client.address : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="truncate text-sm font-semibold text-gray-700">Email:</p>
                  <p className="truncate text-sm font-semibold text-gray-700">{client.email}</p>
                </div>
                <div>
                  <p className="truncate text-sm font-semibold text-gray-700">Phone:</p>
                  <p className="truncate text-sm font-semibold text-gray-700">{client.phone}</p>
                </div>
                <div className="text-end">
                  <p className="truncate text-sm font-semibold text-gray-700">Total Request:</p>
                  <p className="truncate text-sm font-semibold text-gray-700"> {client.requestedTask}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div> no clients found....</div>
        )}
      </section>
    </div>
  );
};

export default Clients;
