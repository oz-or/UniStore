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
  //TODO: When I open the UserDropdown, it pushed its content to the left and creates a scrollbar on the right
  //TODO: fix the links so that they point to the right pages
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ml-1 ">
        <img className="w-6 500:w-8  1024:w-9" src="/User.svg" alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[rgba(0,0,0,0.4)] backdrop-blur-md rounded-[4px] flex flex-col text-text translate-x-[-36px]">
        <UserDropDownMenuItem
          href="/account"
          iconSrc="/UserIcon.svg"
          text="Manage My Account"
        />
        <UserDropDownMenuItem href="#" iconSrc="/Order.svg" text="My Order" />
        <UserDropDownMenuItem
          href="#"
          iconSrc="/Cancel.svg"
          text="My Cancellations"
        />
        <UserDropDownMenuItem
          href="#"
          iconSrc="/Reviews.svg"
          text="My Reviews"
        />
        <UserDropDownMenuItem href="#" iconSrc="/Logout.svg" text="Logout" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
