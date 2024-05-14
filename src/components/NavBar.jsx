import React from "react";
import { useAppContext } from "../context/appContext";

const NavBar = () => {
  const { user } = useAppContext();

  return (
    <div className="bg-gray-800 py-2">
      <h4 className="text-gray-50 font-semibold text-2xl">
        Hey, <span className="block">{user.userName}</span>
      </h4>
    </div>
  );
};

export default NavBar;
