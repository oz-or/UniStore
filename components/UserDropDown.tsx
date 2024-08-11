import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import UserDropDownMenuItem from "./UserDropDownMenuItem";

const UserDropDown = () => {
  //TODO: fix the links so that they point to the right pages
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <img className="w-6 500:w-8 ml-1 1024:w-9" src="User.svg" alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[rgba(0,0,0,0.4)] backdrop-blur-md rounded-[4px] flex flex-col text-text">
        <UserDropDownMenuItem
          href="#"
          iconSrc="UserIcon.svg"
          text="Manage My Account"
        />
        <UserDropDownMenuItem href="#" iconSrc="Order.svg" text="My Order" />
        <UserDropDownMenuItem
          href="#"
          iconSrc="Cancel.svg"
          text="My Cancellations"
        />
        <UserDropDownMenuItem
          href="#"
          iconSrc="Reviews.svg"
          text="My Reviews"
        />
        <UserDropDownMenuItem href="#" iconSrc="Logout.svg" text="Logout" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
