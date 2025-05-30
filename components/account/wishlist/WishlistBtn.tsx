"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useUser } from "@/contexts/UserContext/UserContext";
import { addItemToWishlist, isItemInWishlist, removeItemFromWishlist } from "@/lib/utils/wishlist";
import { useRouter } from "next/navigation";

interface WishlistBtnProps {
  productId: string | number;
}

const WishlistBtn = ({ productId }: WishlistBtnProps) => {
  const { session } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const [inWishlist, setInWishlist] = useState(false);

  // Check if item is in wishlist on mount
  useEffect(() => {
    const checkWishlist = async () => {
      if (user) {
        const exists = await isItemInWishlist(user.id, Number(productId));
        setInWishlist(exists);
      }
    };
    checkWishlist();
  }, [user, productId]);

  const handleAddToWishlist = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!user) {
      console.error("User not found.");
      return;
    }
    try {
      if (!inWishlist) {
        await addItemToWishlist(user.id, Number(productId));
        setInWishlist(true);
      } else {
        await removeItemFromWishlist(user.id, Number(productId));
        setInWishlist(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <button
      className="bg-primary-1 absolute rounded-full p-1.5 right-2 top-2 w-7 h-auto 750:w-8 transition-all duration-200 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
      onClick={handleAddToWishlist}
    >
      <img
        src={inWishlist ? "/WishlistHeartFilled.svg" : "/WishlistHeart.svg"}
        alt="Add to wishlist"
        className="transition-all duration-300 ease-in-out"
      />
    </button>
  );
};

export default WishlistBtn;
