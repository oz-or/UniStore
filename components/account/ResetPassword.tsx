"use client";

import { Input } from "../ui/Input";

const ResetPassword = () => {
  let isOpen = false;

  //TODO: Add a logic that determines if the content of the New Password field is equal to the content of the Confirm New Password field

  return (
    <div>
      <button
        className="text-secondary-2 underline"
        onClick={() => (isOpen = !isOpen)}
      >
        Reset Password
      </button>
      {isOpen && (
        <div>
          <div>
            <Input
              type="text"
              name="user_address"
              placeholder="Current Password"
              className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
            />
          </div>
          <div>
            <Input
              type="text"
              name="user_address"
              placeholder="New Password"
              className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
            />
          </div>
          <div>
            <Input
              type="text"
              name="user_address"
              placeholder="Confirm New Password"
              className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
