"use client";

import Link from "next/link";
import StarRatings from "../StarRatings";
import { useEffect, useState } from "react";
import { addItemToCart } from "@/app/(auth)/login/actions";
import { supabase } from "@/utils/supabase/client";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useUser } from "@/contexts/UserContext/UserContext";

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
  const { session, loading } = useSession();
  const { user, setUser } = useUser();
  const { fetchCartItems } = useCart();

  const [isWishlistHeartHovered, setIsWishlistHeartHovered] = useState(false);

  const handleAddToCart = async () => {
    if (!user.id) {
      console.error("User is not logged in");
      return;
    }

    const item = {
      id: i,
      quantity: 1,
      size: "xs",
    };

    try {
      await addItemToCart(user.id, item);
      fetchCartItems(); // Update the cart items
      console.log("Added to cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const handleAddToWishlist = () => {
    //TODO: Add the product to the user's wishlist with this function
  };

  const handleAddToAlreadyViewed = () => {
    //TODO: I should probably add like a "Last watched" section to the user's profile under Manage my account, but this is not a priority for now
  };

  return (
    <div key={i} className="scale-90 flex flex-col gap-y-4">
      <div
        className="flex flex-col relative bg-secondary items-center "
        onMouseEnter={() => setHovered(i)}
        /* setHovered(-1) hides the Add To Cart button from all items */
        onMouseLeave={() => setHovered(-1)}
      >
        {discountLabel && (
          <span className="bg-secondary-2 text-text py-1 px-2 rounded text-[8px] absolute top-2 left-2 500:text-xs 1024:text-sm 500:top-3 500:left-3">
            -{discountLabel}%
          </span>
        )}

        <img
          className="pt-6 scale-75 h-[180px] 500:h-[250px] 500:scale-[85%]"
          src={img}
          alt={name}
        />

        <button
          className="bg-primary-1 absolute rounded-full p-1.5 right-2 top-2 w-7 h-auto 750:w-8 "
          onClick={() => handleAddToWishlist()}
          /* onMouseEnter={() =>
            setIsWishlistHeartHovered(!isWishlistHeartHovered)
          } */
          /* onMouseLeave={() =>
            setIsWishlistHeartHovered(!isWishlistHeartHovered)
          } */
        >
          <img
            src={
              !isWishlistHeartHovered
                ? "/WishlistHeart.svg"
                : "/WishlistHeartFilled.svg"
            }
            alt=""
          />
        </button>

        {i === hovered && (
          <Link
            href="/cart"
            className="absolute bg-black text-primary-1 w-full rounded p-2.5 bottom-[-10px] opacity-0 animation-appear-bottom text-center"
            onClick={() => handleAddToCart()}
          >
            Add To Cart
          </Link>
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
          {/* TODO: There should be a page where all of the ratings can be seen and the user can rate the product too. Link this to that. */}
          <Link href="/">
            <div className="flex items-center ml-[-35px] 500:ml-[-30px] mt-[-5px] 500:mt-[-15px] 500:scale-110 1024:mt-[-13px]">
              <StarRatings starRating={starRating} />
              <span className="opacity-60 ml-[-20px] mt-[2px] 1024:mt-1 1440:mt-[2px]">
                ({numberOfRatings})
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
