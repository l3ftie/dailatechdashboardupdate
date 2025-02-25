import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const DashCard = ({ title, value, currency }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">{title}</h2>

      <p className="text-gray-50  font-bold text-3xl">
        {value} {currency && <span className="text-base">USD</span>}
      </p>
    </div>
  );
};

export default DashCard;
{
  /* {isLoading && !value ? (
        <div>
          <p className="animate-pulse font-bold text-base  text-gray-300 flex gap-3">
            <span className="animate-spin">
              <AiOutlineLoading />
            </span>{" "}
            Loading
          </p>
        </div>
      ) : ( */
}
