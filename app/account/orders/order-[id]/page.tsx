import { ChevronLeft } from "lucide-react";

const page = () => {
  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2  1024:pb-20 1024:mx-8 1440:mr-0">
      <section id="myProfile" className="grid gap-y-4 500:gap-y-7 ">
        <div className="translate-y-[4px] 500:translate-y-4 1440:translate-y-6 ml-2 flex flex-col gap-y-2">
          <h1 className="font-semibold 500:text-base 750:text-lg 1200:text-2xl 1200:mb-6 1440:text-[26px] ">
            Order [id]
          </h1>
          <span className="opacity-60 text-[10px] 750:text-xs 1440:text-sm 1440:mb-3 flex items-center">
            <ChevronLeft className="h-4" />
            <span>Back to order history</span>
          </span>
        </div>
        <div>
          <div className="flex flex-col justify-between shadow-account-rectangle bg-white p-3 rounded 500:p-4 1200:p-6 1440:p-8">
            <div>
              <div className="flex gap-x-2 750:gap-x-4 1200:gap-x-[22px] 1440:gap-x-7">
                <div className="w-24 h-auto 500:w-20 750:w-24 1200:w-28 1440:w-36">
                  <img
                    src="/products/Backpack.png"
                    alt="Profile picture"
                    className="w-full h-full object-cover scale-[85%]"
                  />
                </div>
                <div className="flex flex-col gap-y-2 500:gap-y-2 750:gap-y-3 1200:gap-y-4 ">
                  <span className="font-semibold text-[11px] 500:text-base 750:text-lg 1200:text-xl 1440:text-2xl">
                    Order: #[order-id]
                  </span>
                  <div className="grid grid-cols-[2fr_1fr] gap-y-3">
                    <div className="text-[7px] flex flex-col gap-y-1">
                      <span className=" opacity-75 500:text-xs 1200:text-sm ">
                        Items
                      </span>
                      <span className="font-semibold">
                        Google Home Smart Speaker - White Slate
                      </span>
                    </div>
                    <div className="text-[7px] flex flex-col gap-y-1 ">
                      <span className=" opacity-75 500:text-xs 1200:text-sm ">
                        Order Date
                      </span>
                      <span className="font-semibold">21-02-2016</span>
                    </div>
                    <div className="flex flex-col text-[7px] gap-y-1">
                      <span className=" opacity-75 500:text-xs 1200:text-sm ">
                        Delivery Address
                      </span>
                      <span className="font-semibold">
                        123 King St, Sydney 2000 NSW
                      </span>
                    </div>
                    <div className="flex flex-col text-[7px] gap-y-1">
                      <span className=" opacity-75 500:text-xs 1200:text-sm ">
                        Courier
                      </span>
                      <div className="flex items-center">
                        <img
                          src="/account/MPL.jpg"
                          alt="MPL logo"
                          className="w-5 h-3 mr-1 "
                        />

                        <span className="font-semibold mt-[1px]">MPL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
