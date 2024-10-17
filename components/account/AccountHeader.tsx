import React from "react";
import NavigationHeading from "../NavigationHeading";

const AccountHeader = () => {
  return (
    <>
      <div className="1440:w-[1440px] 1440:px-12 ">
        <div className="1440:pl-8 flex justify-between ">
          <NavigationHeading pageName="Account" />
          <span className=" pb-14 pt-7 pr-4 1024:py-16 1024:pl-8 1440:pl-0 1440:py-20">
            <img
              src="/account/notifications-outline.png"
              alt=""
              className="w-4 h-4 cursor-pointer 500:w-5 500:h-5 mr-2"
            />
            {/* TODO: When the user has at least 1 notification, display the number of notifications in the corner of this icon and display the /account/notifications-filled.png*/}
          </span>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center items-center flex-col rounded  pt-0 p-4 1024:pt-0 mb-6 gap-y-3 750:gap-y-4">
          <div>
            <img src="/User.svg" alt="" className="h-28 750:h-36" />
          </div>
          <div className="flex flex-col justify-center">
            {/* TODO: Set up supabase to store the name of the user too, not only their email and display the name and email here programmatically */}
            <span className="text-center font-semibold text-lg 750:text-2xl">
              Md Rimel
            </span>
            <span className="font-medium 750:text-lg">mdrimel@gmail.com</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountHeader;
