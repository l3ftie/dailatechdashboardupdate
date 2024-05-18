import moment from "moment";
import React, { useEffect } from "react";
import DashCard from "../components/DashCard";
import RecentBookings from "../components/RecentBookings";
import RecentProviders from "../components/RecentProviders";
import Wrapper from "../components/Wrapper";
import { useAppContext } from "../context/appContext";

const Home = () => {
  const { allStats, getAllStats } = useAppContext();

  useEffect(() => {
    getAllStats();
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col h-full pb-8">
        <div className="p-2 md:p-6">
          <h3 className=" text-2xl font-semibold text-gray-700">Dashboard</h3>
        </div>
        {/* cards */}
        <div className="grid md:grid-cols-4 p-2 md:p-6 gap-3">
          {Object.keys(allStats).length === 0
            ? [...Array(9)].map((_, i) => (
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-xl h-9 w-full font-semibold bg-yellow-300 rounded-md mb-3 animate-pulse" />
                  <p className="bg-white h-9 w-14 rounded-md animate-pulse"></p>
                </div>
              ))
            : Object.keys(allStats).map((key) => (
                <div key={key}>
                  <DashCard title={allStats[key].title} value={allStats[key].value} />
                </div>
              ))}
        </div>
        {/* recent providers and clients */}
        <section className="grid md:grid-cols-2 gap-3 h-full ">
          <div className="bg-white rounded-md p-6 ">
            <p className="font-semibold leading-6">{moment(new Date()).format("LLLL")}</p>
            <hr className="border-yellow-300 my-2" />
            <h3>Today's Bookings</h3>
            <RecentBookings />
          </div>
          <div className="bg-white rounded-md p-6 ">
            <p className="font-semibold leading-6">{moment(new Date()).format("LLLL")}</p>
            <hr className="border-yellow-300 my-2" />
            <h3>Today's Artisans</h3>
            <RecentProviders />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Home;
