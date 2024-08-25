import Link from "next/link";
import { DropdownMenuItem } from "../../ui/DropdownMenu";

const UserDropDownMenuItem = ({
  href,
  iconSrc,
  text,
}: {
  href: string;
  iconSrc: string;
  text: string;
}) => {
  return (
    <Link href={href}>
      <DropdownMenuItem className="flex gap-x-2">
        <img src={iconSrc} alt="" className="h-6" />
        <span className="text-[13px]">{text}</span>
      </DropdownMenuItem>
    </Link>
  );
};

export default UserDropDownMenuItem;
