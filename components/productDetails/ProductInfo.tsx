import Link from "next/link";
import SizesAndBtns from "./SizesAndBtns";
import StarRatings from "../StarRatings";

const ProductInfo = ({
  name,
  price,
  oldPrice,
  starRating,
  numRatings,
  inStock,
  hasSizes,
  desc,
}: ProductDetailsInfoType) => {
  return (
    <div className="750:w-[628px] 1024:w-[400px] 1200:w-[450px] 1440:w-[510px]">
      <div className="flex flex-col ">
        <h3 className="font-semibold text-xl 750:text-3xl">{name}</h3>
        <div className="flex flex-col items-start">
          {/* TODO: There should be a page where all of the ratings can be seen and the user can rate the product too. Link these to that. */}

          <div className="flex items-center gap-x-3 my-[-7px] 1024:my-[-2px]">
            <div className="flex items-center ml-[-35px]  ">
              <Link href="/">
                <StarRatings starRating={starRating} />
              </Link>

              <Link href="/">
                <span className="opacity-60 ml-[-20px] mt-[2px] 1024:mt-1 1440:mt-[2px]">
                  ({numRatings} Reviews)
                </span>
              </Link>
            </div>

            <span
              className={`${
                inStock ? "text-button-1" : "text-error-700"
              }  border-l border-l-[rgba(0,0,0,0.4)] pl-3`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div
            className={`mb-[-5px] text-sm font-medium flex  ${
              oldPrice && " gap-x-3 items-center"
            }`}
          >
            <span className="text-secondary-2 text-lg 750:text-2xl">
              ${price}
            </span>
            {oldPrice && (
              <span className="line-through opacity-60">${oldPrice}</span>
            )}
          </div>
        </div>
      </div>
      <div className="py-5 border-b border-b-[rgba(0,0,0,0.4)] 1024:py-7">
        <p>{desc}</p>
      </div>

      <SizesAndBtns hasSizes={hasSizes} />

      {/* TODO: The underlined texts should point to working links */}
      <div className="border border-[rgba(0,0,0,0.5)] rounded ">
        <div className="flex rounded border-b border-b-[rgba(0,0,0,0.5)] py-1 750:py-3 ">
          <div className="flex items-center">
            <img
              src="/DeliveryIconBlack.svg"
              alt=""
              className="scale-[90%] m-2 750:scale-100 px-2"
            />
          </div>
          <div className="font-medium flex flex-col justify-center gap-y-1">
            <span className="text-base">Free Delivery</span>
            <p className="underline text-[10px] 500:text-[11px] 750:text-xs">
              Enter your postal code for Delivery Availability
            </p>
          </div>
        </div>
        <div className="flex rounded py-1 750:py-3">
          <div className="flex items-center">
            <img
              src="/ReturnIcon.svg"
              alt=""
              className="scale-[90%] m-2 750:scale-100 px-2"
            />
          </div>
          <div className="font-medium flex flex-col justify-center gap-y-1">
            <span className="text-base">Return Delivery</span>
            <p className="text-[10px] 500:text-[11px] 750:text-xs">
              Free 30 Days Delivery Returns.{" "}
              <span className="underline">Details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
