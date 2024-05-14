import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { TbMapPinPin } from "react-icons/tb";
import { useAppContext } from "../context/appContext";

const RecentBookings = () => {
  const { getRecentBookings, recentBookings, isLoading } = useAppContext();

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
    getRecentBookings();
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
      {recentBookings && !isLoading ? (
        recentBookings.map((booking) => (
          <div
            onClick={() => selectedRecent(booking)}
            key={booking._id}
            className="border border-gray-400 rounded-lg p-3 cursor-pointer hover:bg-yellow-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 text-xl leading-6 truncate">{booking.bookingTitle} </h3>
              <div className="flex items-center gap-3">
                {booking.status === "pending" && <span className="text-sm text-orange-500">{booking.status}</span>}
                {booking.status === "active" && <span className="text-sm text-cyan-500">{booking.status}</span>}
                {booking.status === "canceled" && <span className="text-sm text-red-500">{booking.status}</span>}
                {booking.status === "complete" && <span className="text-sm text-emerald-500">{booking.status}</span>}
                {booking.priority && (
                  <span className="text-red-500 text-base">
                    <BsFillLightningChargeFill />
                  </span>
                )}
              </div>
            </div>
            <hr className="my-3" />
            {/*  */}
            <div>
              <p>
                Booking for: {booking.selectedDate} at {booking.selectedTime}
              </p>
              <p>Estimated Time: {booking.workingHours} hrs</p>
              <p>Payment type: {booking.payment}</p>
              <p>
                Total: {booking.total} <span className="font-bold text-sm">USD</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="grid justify-center py-5">
          <p>No booking found for today</p>
        </div>
      )}

      {/* modal content */}
      {isModalOpen && (
        <div className="bg-black/60 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0">
          <div className="bg-white m-4 md:m-0 md:max-w-4xl w-full rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-semibold leading-7">{modalContent.bookingTitle}</h3>
                <h4 className="text-3xl text-yellow-400 font-semibold leading-7">{modalContent.total} USD</h4>
              </div>

              <button onClick={() => handleClosedModal()} className="text-red-500">
                <IoIosCloseCircle size={34} />
              </button>
            </div>
            <hr className="my-3" />
            {/* content */}
            <div className="grid grid-cols-2 gap-3 bg-gray-800 rounded-md p-6 text-gray-50">
              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-xl">Client details</h4>
                <p>Name: {modalContent.clientId.fullName}</p>
                <p>Phone: {modalContent.clientId.phone}</p>
                <p>Verified State: {modalContent.clientId.verified ? "Verified" : "Unverified"}</p>
                <p>Total Task: {modalContent.clientId.requestedTask}</p>
                <p></p>
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-xl">Artisan details</h4>
                <p>Name: {modalContent.providerId.fullName}</p>
                <p>Phone: {modalContent.providerId.phone}</p>
                <p>Specialty: {modalContent.providerId.speciality}</p>
                <p>Verified State: {modalContent.providerId.verified ? "Verified" : "Unverified"}</p>
                <p>Completed Jobs: {modalContent.providerId.jobsComplete}</p>
                <p>Current Ratings: {modalContent.providerId.rating}</p>
              </div>
            </div>
            {/* details */}
            <div className="my-3">
              <h3 className="text-2xl font-semibold">Job Details</h3>
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
                  <p>Booking Created on: {moment(modalContent.createdAt).format("LL")}</p>
                  <p>
                    Booking for:{" "}
                    <span className="text-green-500 font-semibold">
                      {" "}
                      {modalContent.selectedDate} at {modalContent.selectedTime}
                    </span>{" "}
                  </p>
                  <p>Payment Type: {modalContent.payment}</p>
                  <p>Priority: {modalContent.priority ? "Priority Status" : "No Priority"}</p>
                  <p>Current Status: {modalContent.status}</p>
                  <p>Estimated Duration: {modalContent.workingHours} hrs</p>
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

export default RecentBookings;
