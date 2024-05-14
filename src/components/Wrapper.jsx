import React from "react";
import { Navigation } from "./Navigation";

const Wrapper = ({ children }) => {
  return (
    <div className="lg:flex ">
      <div className="h-screen fixed bottom-0 top-0  max-w-80 w-full ">
        <Navigation />
      </div>
      <div className="flex-1 bg-gray-50 md:ml-80 overflow-y-auto h-screen">{children}</div>
    </div>
  );
};

export default Wrapper;
