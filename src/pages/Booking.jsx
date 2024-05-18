import React, { useEffect, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Wrapper from "../components/Wrapper";
import { useAppContext } from "../context/appContext";

const options = [
  {
    id: 1,
    title: "Pending Bookings",
    value: "pending",
  },
  {
    id: 2,
    title: "Active Bookings",
    value: "active",
  },
  {
    id: 3,
    title: "Completed Bookings",
    value: "complete",
  },
  {
    id: 4,
    title: "Canceled Bookings",
    value: "canceled",
  },
];

const Booking = () => {
  const { getSelectedBookingsView, selectedBookings, isLoading } = useAppContext();
  const [selected, setSelected] = useState("pending");

  const handleSelected = (value) => {
    setSelected(value);
    getSelectedBookingsView(value);
  };

  useEffect(() => {
    if (selected) {
      getSelectedBookingsView(selected);
    }
  }, []);

  // console.log(selectedBookings);

  return (
    <Wrapper>
      <div className="flex flex-col h-full pb-8">
        <div className="p-2 md:p-6">
          <h3 className=" text-2xl font-semibold text-gray-700">Bookings</h3>
        </div>
        <div className="px-2 md:px-6">
          <div className="bg-gray-800 rounded-md p-2 w-fit flex gap-2">
            {options.map((option) => (
              <button
                disabled={isLoading}
                onClick={() => handleSelected(option.value)}
                className={`${
                  selected === option.value ? "bg-yellow-300 text-gray-800" : "bg-slate-700 text-gray-200"
                } p-3 rounded-md  text-sm font-semibold hover:bg-yellow-300 hover:text-gray-800`}
                key={option.id}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>
        {/* data */}
        <section className="px-2 mt-4 md:px-6">
          {isLoading ? (
            <div className="min-h-full mt-12 ">
              <div className=" flex w-full h-full flex-col items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-yellow-300 animate-bounce"></div>
                <p className="animate-pulse text-xl font-semibold text-gray-800">Please wait loading...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-flow-row gap-2">
              {selectedBookings.length > 0 && !isLoading ? (
                selectedBookings.map((booking, i) => (
                  <div
                    key={i}
                    className="border border-state-300 p-2 md:p-6 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base text-gray-800">{booking.bookingTitle}</h3>
                      <span className="text-teal-500">{booking.priority ? <BsFillLightningChargeFill /> : <></>}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="grid grid-cols-2">
                      <div>
                        <p>
                          Date/Time: {booking.selectedDate} at {booking.selectedTime}
                        </p>
                        <p>Payment: {booking.payment}</p>
                      </div>
                      <div className="text-end">
                        <p className="text-2xl font-semibold">{booking.total}</p>
                        <p className="text-sm">USD</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No {selected} Bookings found...</div>
              )}
            </div>
          )}
          {/*  */}
        </section>
      </div>
    </Wrapper>
  );
};

export default Booking;
