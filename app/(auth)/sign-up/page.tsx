"use client";

import { signup } from "../login/actions";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  //TODO: Empty the input fields if login is successful and redirect to login page and show a success toast
  //TODO: The signup and login server actions should receive the data that is being sent from the form (formData: FormData) is what these receive
  //TODO: Add error handling

  //TODO: The google login button is not working, fix it

  const isMoreThan500 = useMediaQuery("(min-width: 500px)");
  const isMoreThan1024 = useMediaQuery("(min-width: 1024px)");

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);

    redirect("/account");
  };
  const handleGoogleError = () => {
    //TODO: Add error handling
    console.log("Login Failed");
  };
  return (
    <section
      id="login"
      className="flex flex-col 500:items-center px-2 1200:px-6 pb-20  1024:pb-28"
    >
      <div className="flex flex-col gap-y-2 500:w-[500px] 750:flex-row 750:w-full 750:items-center 750:justify-center 1024:gap-x-20 1200:gap-x-28 750:pt-12 1024:pt-16 ">
        <img
          src="/auth/login.png"
          alt="A shopping cart and a smartphone next to each other"
          className="scale-95 750:scale-[115%] 750:w-[400px] 1024:w-[500px] 1024:pt-4 1200:w-[600px]  750:translate-x-[-48px] 1024:translate-x-[-20px]"
        />

        <div className="flex flex-col gap-y-7 px-2.5 750:pt-2 1024:translate-x-[-24px] 750:w-[300px] 1024:w-[500px]">
          <div className="flex flex-col gap-y-2 1024:gap-y-4">
            <h1 className="font-medium text-[28px] 1024:text-4xl">
              Create an account
            </h1>
            <h2 className="1024:text-base">Enter your details below</h2>
          </div>
          <form className="flex flex-col gap-y-6 1024:gap-y-8">
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Name"
              className="flex h-8 w-full border-b-2 rounded-sm border-b-slate-300 bg-white px-1  text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400 "
              autoComplete="name"
              required
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="flex h-8 w-full border-b-2 rounded-sm border-b-slate-300 bg-white px-1  text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400 "
              autoComplete="email"
              required
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="flex h-8 w-full border-b-2 rounded-sm border-b-slate-300 bg-white px-1  text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400 "
              autoComplete="current-password"
              required
            />
            <div className="flex flex-col justify-between 750:gap-x-8 gap-y-5 500:pt-1">
              <div className="flex flex-row-reverse gap-x-4 750:flex-col-reverse 750:gap-y-4 1024:flex-row-reverse">
                <button
                  formAction={signup}
                  className="bg-secondary-2 text-text py-1.5 w-full text-xs text-nowrap  font-medium 500:py-3 px-8 750:px-1 rounded 750:text-sm"
                >
                  Create an account
                </button>
                <div className=" flex bg-black p-[1px] 500:py-0.5  rounded">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    type={!isMoreThan500 ? "icon" : "standard"}
                    text="signup_with"
                    width={isMoreThan1024 ? 200 : 280}
                    size="large"
                    shape="rectangular"
                    theme="filled_black"
                  />
                </div>
              </div>

              <div className="flex text-sm gap-x-1 items-center 500:text-base 500:gap-x-1.5 text-nowrap 750:text-[15px] justify-center 1024:text-base">
                <span>Already have an account?</span>
                <Link href="/login" className="border-b border-black leading-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
