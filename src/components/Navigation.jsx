import React, { useEffect } from "react";
import { VscArrowSmallRight } from "react-icons/vsc";
import { Link } from "react-router-dom";

import { useAppContext } from "../context/appContext";
import { greeting } from "../utils/urls";

const MenuLinks = [
  {
    id: 1,
    title: "Dashboard",
    toLink: "/",
  },
  {
    id: 2,
    title: "Bookings",
    toLink: "bookings",
  },
  {
    id: 3,
    title: "Clients",
    toLink: "clients",
  },
  {
    id: 4,
    title: "Providers",
    toLink: "providers",
  },
  {
    id: 5,
    title: "Payments",
    toLink: "payments",
  },
];

export const Navigation = () => {
  const { user, logoutUser } = useAppContext();

  return (
    <div className=" relative inset-0 bg-gray-800  h-full  ">
      <div className="p-5  h-full flex flex-col  lg:gap-11">
        <div>
          <div className="pt-5 pb-9">
            <h3 className="font-bold text-3xl text-yellow-300">Dial a tech</h3>
          </div>
          <div className=" space-y-2 flex flex-col">
            <h3 className="text-gray-50 font-semibold text-2xl">Menu</h3>
            {MenuLinks.map((item) => (
              <Link
                className="text-gray-50 group transition-all hover:text-yellow-300 flex justify-between"
                to={item.toLink}
                key={item.id}
              >
                {item.title}
                <span className="">
                  <VscArrowSmallRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-gray-50 font-semibold text-2xl">Settings</h3>
          <Link to="profile" className="text-gray-50 group transition-all hover:text-yellow-300 flex justify-between">
            My Profile
            <span className="">
              <VscArrowSmallRight />
            </span>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 rounded-lg right-1 left-1  p-4 bg-gray-50 mx-3">
        <div className="h-16 w-16 bg-gray-800 rounded-lg mb-5"></div>
        <p className="font-semibold text-sm text-gray-800">{greeting()}</p>
        <p className="truncate text-sm ">{user.userName} </p>
        <button
          onClick={logoutUser}
          className=" bg-yellow-300 flex items-center justify-between mt-3 rounded-lg w-full font-semibold p-2"
        >
          Log out
          <span className="">
            <VscArrowSmallRight />
          </span>
        </button>
      </div>
    </div>
  );
};
