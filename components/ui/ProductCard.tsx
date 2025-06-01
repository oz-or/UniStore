"use client";

import { useState, useRef } from "react";
import {
  addItemToCart,
  updateCartItemQuantity,
} from "@/app/(auth)/login/actions";
import { useSession } from "@/contexts/SessionContext/SessionContext";
import { useCart } from "@/contexts/CartContext/CartContext";
import { useUser } from "@/contexts/UserContext/UserContext";
import { useRouter } from "next/navigation";
import WishlistBtn from "../account/wishlist/WishlistBtn";

const ProductCard = ({
  i,
  img,
  name,
  price,
  hovered,
  setHovered,
  discount: discountLabel,
  oldPrice,
  inStock,
}: ProductCardType) => {
  const { session } = useSession();
  const { user, setUser } = useUser();
  const { fetchCartItems, cartItems } = useCart();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setAddingToCart(true);

    const item = {
      id: i,
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
      fetchCartItems();
      console.log("Added to cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click is on the WishlistBtn or Add to Cart, do nothing
    if (
      (e.target as HTMLElement).closest(".wishlist-btn") ||
      (e.target as HTMLElement).closest(".add-to-cart-btn")
    ) {
      return;
    }
    router.push(`/product/${encodeURIComponent(name)}`);
  };

  return (
    <div
      key={i}
      className={`scale-90 flex flex-col gap-y-4 items-start ${
        inStock ? "" : "opacity-50 pointer-events-none"
      }`}
    >
      <div
        ref={cardRef}
        className={`flex flex-col relative bg-secondary items-center w-full rounded-lg transition-all duration-200 ${
          inStock ? "cursor-pointer" : "opacity-75 pointer-events-none"
        }`}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(-1)}
        onClick={inStock ? handleCardClick : undefined}
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

        {/* WishlistBtn - add a className */}
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 z-10 wishlist-btn"
        >
          <WishlistBtn productId={i} />
        </div>

        <div
          className="absolute w-full rounded p-2.5 bottom-[-10px] text-center flex justify-center items-center"
          style={{ minHeight: "44px" }}
        >
          {addingToCart ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-secondary-2" />
            </div>
          ) : (
            i === hovered && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="bg-black text-primary-1 w-full rounded p-2.5 opacity-0 animation-appear-bottom text-center add-to-cart-btn"
              >
                Add To Cart
              </button>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="font-medium text-base 500:text-xl ">{name}</h3>
        <div className={`flex flex-col items-start `}>
          <div
            className={`mb-[-5px] text-[14px] font-medium flex 500:text-base ${
              oldPrice ? "gap-x-3 items-center" : ""
            }`}
          >
            <span
              className={`${
                discountLabel ? "text-secondary-2" : ""
              } text-base 1024:text-lg`}
            >
              ${price}
            </span>
            {oldPrice && (
              <span className="line-through opacity-60">${oldPrice}</span>
            )}
          </div>
          {/* In Stock / Out of Stock label */}
          {typeof inStock === "boolean" && (
            <span
              className={`mt-3 text-xs px-2 py-[2px] rounded font-medium  ${
                inStock
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              } `}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
