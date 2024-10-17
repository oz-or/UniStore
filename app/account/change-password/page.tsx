import ResetPassword from "@/components/account/ResetPassword";
import { Input } from "@/components/ui/Input";

const page = () => {
  return (
    <div>
      <form className="rounded shadow-md p-4">
        <h2 className="text-secondary-2 text-lg font-medium">
          Edit Your Profile
        </h2>
        <div>
          <div className="flex flex-col  gap-y-8 1024:gap-y-10 1200:flex-row 1200:gap-x-5 ">
            <div>
              <label htmlFor="name">Full Name</label>
              <Input
                type="text"
                name="user_name"
                placeholder="Md Rimel"
                className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 1024:w-[400px] 1200:w-full border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                name="user_email"
                placeholder={"rimel1111@gmail.com"}
                className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                name="user_address"
                placeholder="Your Address"
                className="pl-4 py-2.5 relative placeholder:opacity-90 bg-secondary rounded-[4px] border-none 500:pl-6 border-neutral-300 focus:outline-none focus:ring-[1px] focus:ring-neutral-300 1440:text-[16px] 1440:py-3 1440:placeholder:opacity-60 "
              />
            </div>
          </div>
          <form
            action="
          "
          >
            <div>
              <ResetPassword />
              <div className="flex">
                <button
                  className="text-base" /*TODO: This button should reset the entire form to the default data*/
                >
                  Cancel
                </button>
                <button
                  className="bg-secondary-2 text-text py-2 px-8 text-xs w-[170px] font-medium 500:py-3 750:text-sm 500:w-[200px] rounded" /* TODO:This button should change the users data if there is at least one new valid input in an input field */
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
};

export default page;
