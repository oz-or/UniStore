"use client";

import HeaderAndEdit from "./HeaderAndEdit";

const Profile = () => {
  const handleEdit = () => {
    // Enable the corresponding form fields for editing (this one function will be responsible for editing all the fields separately)
  };
  const handlePasswordChange = () => {
    // The password change form field should be enabled and below this component
  };

  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2  1024:pb-20 1024:mx-8 1440:mr-0">
      <section id="myProfile" className="grid gap-y-4 500:gap-y-7 ">
        <h1 className="font-semibold ml-2 500:text-base translate-y-[4px] 750:text-lg 500:translate-y-4 1200:text-2xl 1200:mb-6 1440:text-[26px] 1440:translate-y-6">
          My Profile
        </h1>
        <div className="flex justify-between shadow-account-rectangle bg-white p-3 1200:p-7 rounded 500:p-5 ">
          <div className="flex gap-x-2.5 500:gap-x-4">
            <img
              src="/User.svg"
              alt="Profile picture"
              className="w-11 500:w-16 750:w-[72px] 1200:w-[84px] 1440:w-24"
            />
            <div className="flex flex-col 750:gap-y-1.5 1440:gap-y-2.5">
              <span className="font-semibold text-[13px] 500:text-base 750:text-lg 1200:text-xl 1440:text-2xl">
                Jack Adams
              </span>
              <div className="text-[9px] opacity-75 500:text-xs flex flex-col  gap-y-0.5 500:gap-y-1 750:gap-y-2 1200:text-sm 1440:gap-y-3">
                <span>jackadams@gmail.com</span>
                <span>Los Angeles, California, USA</span>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handlePasswordChange}
              className="flex shadow-account-rectangle bg-white px-1 py-0.5 items-center translate-y-[2px]"
            >
              <img
                src="/account/pencil-edit.png"
                alt="Edit"
                className="w-2 mr-1 ml-0.5 750:w-[11px] 1440:w-3"
              />
              <span className="opacity-75 text-[7px] 500:text-[10px] 750:text-xs 1440:text-[13px]">
                Change Password
              </span>
            </button>
          </div>
        </div>
        <div className="shadow-account-rectangle bg-white p-3 500:p-5 rounded">
          <HeaderAndEdit
            header={"Account Information"}
            handleEdit={handleEdit}
          />
          <form className="grid grid-cols-[repeat(2,_125px)] gap-x-8 500:grid-cols-[repeat(2,_180px)] gap-y-3 500:gap-y-4 750:gap-y-8 750:grid-cols-[repeat(2,_250px)]">
            {/* The placeholders should be the actual user data */}

            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="firstName"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Jack"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>
            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="lastName"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Adams"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>
            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="email"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="jackadams@gmail.com"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>

            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="phone"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="(213) 555-1234"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[12px] 1200:placeholder:text-sm"
              />
            </div>
          </form>
        </div>
        {/*  */}
        {/*  */}
        <div className="shadow-account-rectangle bg-white p-3 500:p-5 rounded">
          <HeaderAndEdit header={"Address"} handleEdit={handleEdit} />
          <form className="grid grid-cols-[repeat(2,_125px)] gap-x-8 500:grid-cols-[repeat(2,_180px)] gap-y-3 500:gap-y-4 750:gap-y-8 750:grid-cols-[repeat(2,_250px)]">
            {/* The placeholders should be the actual user data */}

            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="country"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter your country"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>
            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="cityState"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                City/State
              </label>
              <input
                type="text"
                id="cityState"
                placeholder="Enter your city/state"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>
            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="postalcode"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalcode"
                placeholder="Enter your postal code"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>

            <div className="text-xs flex flex-col 750:gap-y-1 1200:gap-y-3">
              <label
                htmlFor="taxId"
                className="text-[9px] opacity-60 h-2.5 500:text-[13px] 500:h-[18px] 1200:text-[15px] "
              >
                TAX ID
              </label>
              <input
                type="text"
                id="taxId"
                placeholder="Enter your TAX ID"
                disabled
                className="h-6 placeholder:text-[9px] pl-0 flex w-full disabled:placeholder-gray-500 rounded-md border border-slate-200 bg-white px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100  disabled:ring-offset-white disabled:ring-offset-0 disabled:ring-0 disabled:border-0 disabled:bg-transparent  disabled:font-medium  disabled:focus-visible:outline-none disabled:focus-visible:ring-2 500:placeholder:text-[13px] 1200:placeholder:text-[15px]"
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Profile;
