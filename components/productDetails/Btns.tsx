"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import WishlistBtn from "../account/wishlist/WishlistBtn";
import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/app/(auth)/login/actions";
import { removeItemFromWishlist } from "@/lib/utils/wishlist";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useUser } from "@/contexts/UserContext/UserContext";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useRouter } from "next/navigation";

const warningToast = () => {
  toast.error("One person can only order a maximum of 10 items at a time", {
    duration: 6000,
  });
};

const Btns = ({ productId }: { productId: number }) => {
  const [quantity, setQuantity] = useState(1);

  const { session } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState(false);
  const { fetchCartItems, cartItems } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItemsType[]>([]);

  const handleIncrement = () => {
    if (quantity >= 10) {
      return setQuantity(10), warningToast();
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrement = () => {
    quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1);
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    if (!user) return;
    try {
      await removeItemFromWishlist(user.id, productId);
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
      toast.success("Removed from wishlist!");
    } catch (error) {
      toast.error("Failed to remove from wishlist.");
    }
  };

  const handleAddToCart = async (itemId: number) => {
    if (!session) {
      router.push("/login");
      return;
    }

    setAddingToCart(true);

    const item = {
      id: itemId,
      quantity: 1,
    };

    try {
      // Check for existing item by id
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // Update quantity
        await updateCartItemQuantity(item.id, existingItem.quantity + 1);
      } else {
        // Add new item
        if (user) {
          await addItemToCart(user.id, item);
        } else {
          throw new Error("User is not available.");
        }
      }
      await fetchCartItems();
      toast.success("Added to cart!");
      handleRemoveFromWishlist(itemId);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  const [isMinusHovered, setIsMinusHovered] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);

  const [isWishlistHeartHovered, setIsWishlistHeartHovered] = useState(false);

  return (
    <>
      <Toaster />
      <div className="mb-10 pt-6 750:pt-8 ">
        <div className="flex gap-x-4 500:gap-x-7 1024:gap-x-4 1200:gap-x-14">
          <div className="flex items-center h-[38px] 500:h-10 500:w-[159px] ">
            <button
              className={`w-8 h-full 500:w-10  flex justify-center items-center border border-[rgba(0,0,0,0.5)] ${
                quantity > 1 && "hover:border-secondary-2 hover:bg-secondary-2 "
              }`}
              onMouseEnter={() => {
                quantity <= 1
                  ? setIsMinusHovered(false)
                  : setIsMinusHovered(true);
              }}
              onMouseLeave={() => {
                setIsMinusHovered(false);
              }}
              onClick={handleDecrement}
            >
              <img
                src={`${
                  isMinusHovered
                    ? "/productDetails/MinusIconWhite.svg"
                    : "/productDetails/MinusIconBlack.svg"
                }`}
                alt=""
                className="scale-75 500:scale-100"
              />
            </button>
            <span className="font-medium px-5 text-lg h-full flex items-center justify-center flex-1 border-y border-[rgba(0,0,0,0.5)]">
              {quantity}
            </span>
            <button
              className={`w-8 h-full 500:w-10 flex justify-center items-center border border-[rgba(0,0,0,0.5)] ${
                quantity < 10 && "hover:border-secondary-2 hover:bg-secondary-2"
              } `}
              onMouseEnter={() =>
                quantity >= 10
                  ? setIsPlusHovered(false)
                  : setIsPlusHovered(true)
              }
              onMouseLeave={() => setIsPlusHovered(false)}
              onClick={handleIncrement}
            >
              <img
                src={`${
                  isPlusHovered
                    ? "/productDetails/PlusIconWhite.svg"
                    : "/productDetails/PlusIconBlack.svg"
                }`}
                alt=""
                className="scale-75 500:scale-100"
              />
            </button>
          </div>

          <button
            onClick={() => handleAddToCart(productId)}
            className="bg-secondary-2 text-text py-2 px-8 text-base  font-medium 750:text-sm 500:w-[200px] rounded w-[139px] h-[38px] 500:h-10 1024:w-[159px] 1440:w-[200px]"
          >
            Buy Now
          </button>

          <div className="rounded border border-[rgba(0,0,0,0.5)] h-[38px] 500:h-10 w-[38px] 500:w-10 flex items-center justify-center">
            <WishlistBtn productId={productId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Btns;
