"use client";

import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/app/(auth)/login/actions";
import WishlistBtn from "@/components/account/wishlist/WishlistBtn";
import PageLoadingSpinner from "@/components/ui/PageLoadingSpinner";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useUser } from "@/contexts/UserContext/UserContext";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getWishlist,
  clearWishlist,
  removeItemFromWishlist,
} from "@/lib/utils/wishlist";

const WishlistPage = () => {
  const { session } = useSession();
  const { user } = useUser();
  const [addingToCart, setAddingToCart] = useState(false);
  const { fetchCartItems, cartItems } = useCart();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItemsType[]>([]);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    if (!user) return;
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(user.id);
        setWishlistItems(data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false); // <-- Set loading to false after fetching
      }
    };
    fetchWishlist();
  }, [user]);

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

  const handleClearWishlist = async () => {
    if (!user) return;
    try {
      await clearWishlist(user.id);
      setWishlistItems([]);
      toast.success("Wishlist cleared!");
    } catch (error) {
      toast.error("Failed to clear wishlist.");
    }
  };

  const handleMoveAllToCart = async () => {
    if (!user) return;
    try {
      for (const item of wishlistItems) {
        await addItemToCart(user.id, { id: item.id, quantity: 1 });
      }
      await clearWishlist(user.id);
      setWishlistItems([]);
      await fetchCartItems();
      toast.success("All wishlist items moved to cart!");
    } catch (error) {
      toast.error("Failed to move items to cart.");
    }
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

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PageLoadingSpinner />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2 1024:pb-20 1024:mx-8 1440:mr-0">
        <Toaster />
        <section className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-full 500:max-w-[500px] 750:max-w-[750px] 1024:max-w-[1024px] 1200:max-w-[1200px] 1440:max-w-[1440px] mx-auto px-4 py-8 500:mb-12 1200:mb-20 pb-16 ">
            <h1 className="font-semibold 500:text-base 750:text-lg 1200:text-2xl 1200:mb-6 1440:text-[26px]">
              Wishlist
            </h1>
            <div className="flex flex-col items-center justify-center mt-12 750:mt-16 1024:mt-20">
              <h2 className="font-bold mb-4 text-xl 500:text-2xl 750:text-3xl 1440:text-4xl ">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 mb-6 text-[13px] 500:text-base 750:text-lg 1440:text-xl ">
                Looks like you haven&apos;t added anything yet.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-secondary-2 text-white px-6 py-2 rounded hover:bg-secondary-3 transition-colors duration-200 text-base 500:text-lg 750:text-xl 500:px-8 750:px-10 500:py-3 750:py-4 1440:px-12 1440:py-5  "
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="ml-[52px] mt-2.5 750:ml-[70px] 750:mr-5 px-2 1024:pb-20 1024:mx-8 1440:mr-0">
      <Toaster />
      <section className="grid gap-y-4 500:gap-y-7">
        <div className="translate-y-[4px] 500:translate-y-4 1440:translate-y-6 ml-2 mr-3 flex flex-col gap-y-2 750:mx-4">
          <h1 className="font-semibold 500:text-base 750:text-lg 1200:text-2xl 1200:mb-6 1440:text-[26px]">
            Wishlist
          </h1>
          <span className="opacity-60 text-[10px] 750:text-xs 1440:text-sm 1440:mb-3">
            {wishlistItems.length} items
          </span>
          <div className="flex justify-between items-center">
            <span className="opacity-80 text-xs 500:text-sm 1440:text-base font-semibold">
              Total: $
              {wishlistItems
                .reduce((sum, item) => sum + (item.price || 0), 0)
                .toFixed(2)}
            </span>
            {/* TODO: Make these 2 buttons fit to the rest of the page and they should be next to the Total text (with justify-between), not under it*/}
            <div className="flex gap-2 500:text-xs text-[9px] 750:gap-x-5 750:text-sm 1200:gap-x-6  ">
              <button
                onClick={handleClearWishlist}
                className="500:px-3 py-1 px-2 1200:py-2 rounded bg-red-100 text-red-700 font-semibold border border-red-200 hover:bg-red-200 hover:text-red-900 transition-all duration-200"
              >
                Clear Wishlist
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="500:px-3 py-1 px-2 1200:py-2 rounded bg-primary-2 text-primary-1 font-semibold hover:bg-opacity-80 transition-all duration-200"
              >
                Move All To Cart
              </button>
            </div>
          </div>
        </div>
        <div
          className="
            grid gap-2
            500:grid-cols-2
            1200:grid-cols-3
          "
        >
          {wishlistItems.map((item) => {
            // Destructure and rename old_price to oldPrice
            const {
              id,
              img,
              name,
              price,
              old_price: oldPrice,
              discount,
            } = item;

            return (
              <div
                key={id}
                className="scale-90 flex flex-col gap-y-4 bg-secondary rounded-lg shadow-account-rectangle"
              >
                <div className="flex flex-col relative items-center bg-secondary">
                  {discount && (
                    <span
                      className="
                      bg-secondary-2 text-text
                      py-1 px-2
                      rounded
                      text-[11px] 500:text-xs 1024:text-sm
                      absolute top-2 left-2
                      500:top-3 500:left-3
                      font-semibold
                      transition-all
                    "
                    >
                      -{discount}%
                    </span>
                  )}

                  <img
                    className="pt-6 scale-75 h-[180px] 500:h-[250px] 500:scale-[85%]"
                    src={img}
                    alt={name}
                  />

                  <WishlistBtn productId={id} />
                </div>
                <div className="flex flex-col gap-y-2 px-4 pb-4">
                  <h3 className="font-medium text-base 500:text-xl">{name}</h3>
                  <div className="flex flex-col items-start">
                    <div className="mb-[-5px] text-[14px] font-medium flex 500:text-base gap-x-3 items-center">
                      <span className="text-secondary-2 text-base 1024:text-lg">
                        ${price}
                      </span>
                      {oldPrice && (
                        <span className="line-through opacity-60">
                          ${oldPrice}
                        </span>
                      )}
                    </div>
                    {/* In Stock label */}
                    <span className="mt-3 text-xs text-green-700 bg-green-100 px-2 py-[2px] rounded font-medium">
                      In Stock
                    </span>
                  </div>
                  <div className="flex gap-x-2 mt-2">
                    <button
                      className="bg-primary-2 text-primary-1 rounded px-3 py-1 750:px-5 750:py-2 transition-all duration-200 text-xs 500:text-sm 1200:text-base font-semibold shadow hover:bg-opacity-80 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
                      onClick={() => handleAddToCart(id)}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="px-3 py-1 750:px-5 750:py-2 border border-gray-300 rounded transition-all duration-200 text-xs 500:text-sm 1200:text-base font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 hover:scale-105 hover:shadow focus:outline-none focus:ring-2 focus:ring-red-200"
                      onClick={() => handleRemoveFromWishlist(id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default WishlistPage;
