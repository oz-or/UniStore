import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Link href={"/"} className="flex justify-center py-4">
      <button className="flex items-center justify-center gap-x-2 p-4 border w-40 text-nowrap rounded shadow-md">
        <img
          src="/account/back-to-home.png"
          alt="Back to Home icon"
          className="cursor-pointer font-medium "
        />
        <span>Back to Home</span>
      </button>
    </Link>
  );
};

export default Footer;
