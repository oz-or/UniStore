"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import UserDropDownMenuItem from "./UserDropDownMenuItem";
import { logout } from "@/app/(auth)/login/actions";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

const UserDropDown = ({
  session,
  userLoggedIn,
}: {
  session: Session | null;
  userLoggedIn: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);


  const handleLogout = async () => {
    if (userLoggedIn) {
      console.log("Logging out");

      await logout();

      //TODO: After logging out if the user is on a page that needs authentication, redirect them to the login page with router.push("/login")
      console.log("Successfully Logged out");
    } else {
      return;
    }
  };

  //TODO: Change the default image(the gravatar image) to the user's profile picture
  const profilePicture = !userLoggedIn
    ? "/User.svg"
    : "https://www.gravatar.com/avatar/";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="rounded-full ml-1 ">
        <img className="w-6 500:w-8 1024:w-9" src={profilePicture} alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="z-50 bg-[rgba(0,0,0,0.4)] backdrop-blur-md rounded-[4px] flex flex-col text-text w-max max-w-xs mt-2 overflow-x-hidden"
        style={{ maxWidth: '100vw', overflowX: 'hidden' }} // <-- add this
        collisionPadding={8} // <-- add this if supported
      >
        <UserDropDownMenuItem
          href="/account"
          iconSrc="/UserIcon.svg"
          text="Manage My Account"
        />
        <UserDropDownMenuItem
          href="/account/orders"
          iconSrc="/Order.svg"
          text="My Orders"
        />
        {/* TODO: Add the wishlistheart svg here with white stroke */}
        <UserDropDownMenuItem
          href="/account/wishlist"
          iconSrc="/Cancel.svg"
          text="My Wishlist"
        />
        <DropdownMenuSeparator className="bg-text/20" />

        <button onClick={handleLogout}>
          <DropdownMenuItem className="flex gap-x-2">
            <img src="/Logout.svg" alt="" className="h-6" />
            <span className="text-[13px]">Logout</span>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
