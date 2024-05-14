import React from "react";
import Wrapper from "../components/Wrapper";

const Profile = () => {
  return (
    <Wrapper>
      <div className="flex flex-col h-full pb-8">
        <div className="p-2 md:p-6">
          <h3 className=" text-2xl font-semibold text-gray-700">Profile</h3>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
