import Link from "next/link";

const page = () => {
  let hasSize = true;

  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2  1024:pb-20 1024:mx-8 1440:mr-0">
      <section id="myProfile" className="grid gap-y-4 500:gap-y-7 ">
        <div className="translate-y-[4px] 500:translate-y-4 1440:translate-y-6 ml-2 flex flex-col gap-y-2">
          <h1 className="font-semibold 500:text-base 750:text-lg 1200:text-2xl 1200:mb-6 1440:text-[26px] ">
            Order History
          </h1>
          <span className="opacity-60 text-[10px] 750:text-xs 1440:text-sm 1440:mb-3">
            3 orders
          </span>
        </div>
        <div>
          <div className="flex flex-col justify-between shadow-account-rectangle bg-white p-3 rounded 500:p-4 1200:p-6 1440:p-8">
            <div className="flex justify-between">
              <div className="flex gap-x-2.5 750:gap-x-4 1200:gap-x-[22px] 1440:gap-x-7">
                <div className="w-14 h-auto 500:w-20 750:w-24 1200:w-28 1440:w-36">
                  <img
                    src="/products/Backpack.png"
                    alt="Profile picture"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-y-1 500:gap-y-2 750:gap-y-3 1200:gap-y-4 ">
                  <span className="font-semibold text-[11px] 500:text-base 750:text-lg 1200:text-xl 1440:text-2xl">
                    Decoration Flower port
                  </span>
                  <div className="flex gap-x-2">
                    {hasSize && (
                      <span className="text-[9px] opacity-75 500:text-xs 1200:text-sm ">
                        Size: S
                      </span>
                    )}
                    <span className="text-[9px] opacity-75 500:text-xs 1200:text-sm  ">
                      Quantity: 1
                    </span>
                  </div>
                  <span className="font-semibold text-[10px] 500:text-[13px] 1200:text-[15px] 1440:mt-6 1440:text-base">
                    $80.00
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center px-3.5 border-l ml-3.5 500:pl-6 500:ml-6 750:pl-12 750:ml-10 750:pr-10 750:gap-y-1">
                <span className="text-[9px] opacity-75 500:text-xs 750:text-sm 1200:text-base">
                  Status
                </span>
                {/* The status needs to be set programmatically to Delivered/Cancelled/Dispatched */}
                <span className="text-success-400 text-[10px] 750:text-xs 1200:text-sm">
                  Delivered
                </span>
              </div>
            </div>
          </div>
          <div className="text-[8px] 750:text-xs 1440:text-[13px] flex">
            <Link
              href="/account/orders/order-[id]"
              className="w-full py-1 750:py-2 1200:py-2.5 hover:opacity-80 rounded border text-center"
            >
              <button>View order details</button>
            </Link>
            <button className="w-full py-1 750:py-2 1200:py-2.5 hover:opacity-80 rounded border border-l-0">
              Show invoice
              {/* When clicking on this button, it should download the invoice (as a PDF)*/}
            </button>
          </div>
        </div>

        <div className="shadow-account-rectangle bg-white p-3 500:p-5 rounded"></div>
        {/*  */}
        {/*  */}
        <div className="shadow-account-rectangle bg-white p-3 500:p-5 rounded"></div>
      </section>
    </main>
  );
};

export default page;
