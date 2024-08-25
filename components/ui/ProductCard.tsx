import Link from "next/link";
import StarRatings from "../StarRatings";

const ProductCard = ({
  i,
  img,
  name,
  price,
  rating: starRating,
  numberOfRatings,
  hovered,
  setHovered,
  discount: discountLabel,
  oldPrice,
}: ProductCardType) => {
  const handleAddToCart = () => {
    //TODO: Add the product to the user's cart with this function
  };

  const handleAddToWishlist = () => {
    //TODO: Add the product to the user's wishlist with this function
  };

  const handleAddToAlreadyViewed = () => {
    //TODO: I should probably add like a "Last watched" section to the user's profile under Manage my account, but this is not a priority for now
  };

  return (
    <div
      key={i}
      className="scale-90 flex flex-col gap-y-4"
      onMouseEnter={() => setHovered(i)}
      /* setHovered(-1) hides the Add To Cart button from all items */
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="flex flex-col relative bg-secondary items-center ">
        {discountLabel && (
          <span className="bg-secondary-2 text-text py-1 px-2 rounded text-[8px] absolute top-2 left-2 500:text-xs 1024:text-sm 500:top-3 500:left-3">
            -{discountLabel}%
          </span>
        )}

        {/*TODO: Make this link work */}
        <Link href="#">
          <img
            className="pt-6 scale-75 h-[180px] 500:h-[250px]"
            src={img}
            alt={name}
          />
        </Link>
        <button
          className="bg-primary-1 absolute rounded-full p-1.5 right-2 top-2 w-7 h-auto 750:w-8 "
          onClick={() => handleAddToWishlist()}
        >
          <img src="/WishlistHeart.svg" alt="" />
        </button>
        <button onClick={() => handleAddToAlreadyViewed()}>
          <img
            className="absolute right-2 top-11 w-7 750:w-8 h-auto 750:top-12"
            src="/Eye.svg"
            alt=""
          />
        </button>

        {i === hovered && (
          <button
            className="absolute bg-black text-primary-1 w-full rounded p-2.5 bottom-[-10px] opacity-0 animation-smooth-appear"
            onClick={() => handleAddToCart()}
          >
            Add To Cart
          </button>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="font-medium text-base 500:text-xl ">{name}</h3>
        <div
          className={`flex 500:gap-y-3 flex-col items-start ${
            !oldPrice && "500:flex-row 500:gap-x-5"
          }`}
        >
          <div
            className={`mb-[-5px] text-[14px] font-medium flex 500:text-base ${
              oldPrice && " gap-x-3 items-center"
            }`}
          >
            <span className="text-secondary-2 text-base 1024:text-lg">
              ${price}
            </span>
            {oldPrice && (
              <span className="line-through opacity-60">${oldPrice}</span>
            )}
          </div>
          <div className="flex items-center ml-[-35px] 500:ml-[-30px] mt-[-5px] 500:mt-[-15px] 500:scale-110 1024:mt-[-13px]">
            <StarRatings starRating={starRating} />
            <span className="opacity-60 ml-[-20px] mt-[2px] 1024:mt-1 1440:mt-[2px]">
              ({numberOfRatings})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
