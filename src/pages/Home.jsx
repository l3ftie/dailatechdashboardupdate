import moment from "moment";
import React, { useEffect } from "react";
import DashCard from "../components/DashCard";
import RecentBookings from "../components/RecentBookings";
import RecentProviders from "../components/RecentProviders";
import { useAppContext } from "../context/appContext";

const Home = () => {
  const { allStats, getAllStats } = useAppContext();

  useEffect(() => {
    getAllStats();
  }, []);

  return (
    <div className="flex flex-col h-full pb-8">
      <div className="p-2 md:p-6">
        <h3 className=" text-2xl font-semibold text-gray-700">Dashboard</h3>
      </div>
      {/* cards */}
      <div className="grid md:grid-cols-4 p-2 md:p-6 gap-3">
        <DashCard title="Users" value={allStats.totalClients} />
        <DashCard title="Artisans" value={allStats.totalProviders} />
        <DashCard title="Bookings" value={allStats.totalJobs} />
        <DashCard title="Categories" value={allStats.totalCategories} />
        <DashCard title="Bookings Completed" value={allStats.totalJobsCompleted} />
        <DashCard title="Bookings Pending" value={allStats.totalPendingJobs} />
        <DashCard title="Bookings Canceled" value={allStats.totalCanceledJobs} />
        <DashCard title="Pending Sales" value={allStats.totalPendingSales} currency />
        <DashCard title="Total Sales" value={allStats.totalSales} currency />
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
  );
};

export default Home;
