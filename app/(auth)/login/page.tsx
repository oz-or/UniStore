import { login } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  //TODO: Empty the input fields if login is successful
  //TODO: Add error handling for login

  //TODO: Add a google login button with the text of "Login with Google"
  //TODO: Add a way to navigate to the sign-up page from here f.e. "Don't have an account? Sign Up" just like in the sign up page with the login navigation
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
              Log in to UniStore
            </h1>
            <h2 className="1024:text-base">Enter your details below</h2>
          </div>
          <form className="flex flex-col gap-y-6 1024:gap-y-8">
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
              <div className="flex flex-row-reverse gap-x-6 1024:gap-x-16 750:flex-col 750:gap-y-4 1024:flex-row-reverse justify-between">
                <button
                  formAction={login}
                  className="bg-secondary-2 text-text py-2.5 w-full text-xs max-w-[200px] font-medium 500:py-3 px-8 750:px-1 rounded 750:text-sm 750:max-w-full 1024:max-w-[200px]"
                >
                  Log in
                </button>
                <div className="flex text-sm items-center 500:text-base 500:gap-x-1.5 text-nowrap 750:text-[15px] justify-center 1024:text-base">
                  <Link href="/" className="text-secondary-2 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
  {
    /* <section
      id="login"
      className="flex flex-col 500:items-center px-2 1200:px-6 pb-20"
    >
      <div className="flex flex-col gap-y-2 500:w-[500px] 750:flex-row 750:w-full 750:items-center 750:justify-center 1024:gap-x-20 1200:gap-x-28">
        <div>
          <img
            src="/auth/login.png"
            alt="A shopping cart and a smartphone next to each other"
            className="scale-95 750:w-[375px] 750:pt-6 1024:w-[550px] 1024:scale-100 1200:w-full"
          />
        </div>
        <div className="flex flex-col gap-y-7 px-2.5 750:pt-8 1024:translate-x-[-24px]">
          <div className="flex flex-col gap-y-2 1024:gap-y-4">
            <h1 className="font-medium text-[28px] 1024:text-4xl">
              Log in to UniStore
            </h1>
            <h2 className="1024:text-base">Enter your details below</h2>
          </div>
          <form className="flex flex-col gap-y-6 1024:gap-y-8">
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
            <div className="flex justify-between 750:gap-x-8">
              <div className="flex text-sm gap-x-1 items-center 500:text-base 500:gap-x-1.5 text-nowrap 750:text-[15px]">
                <Link href="/newPassword" className="text-secondary-2">
                  Forgot your password?
                </Link>
              </div>
              <button
                formAction={login}
                className="bg-secondary-2 text-text py-2.5 px-8 text-xs w-[120px] font-medium 500:py-3 750:text-sm 500:w-[150px] rounded"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section> */
  }
}
