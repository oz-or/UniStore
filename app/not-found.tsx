"use client";

import NavigationHeading from "@/components/NavigationHeading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handlePreviousPage = () => {
    router.back();
  };
  return (
    <section
      id="notFound"
      className="flex flex-col 1440:items-center px-2 1200:px-6 "
    >
      {/* TODO: Fix the width (it is bigger than the width of the homePage ()where the texts are) f.e.)  */}
      <div className="1440:w-[1340px]">
        <NavigationHeading pageName="404 Error" />

        <div className="flex flex-col items-center py-10 750:py-20 1440:py-32">
          <div className="flex flex-col items-center 1024:gap-y-4 ">
            <h1 className="font-medium text-[40px] 500:text-[54px] 750:text-[76px] 1024:text-8xl 1200:text-[110px]">
              404 Not Found
            </h1>
            <p className="text-[10px] 500:text-[13px] 750:text-[15px] 1024:text-base">
              We could not find the page that you were looking for
            </p>
          </div>
          <Link href="/">
            <button
              onClick={handlePreviousPage}
              className="bg-secondary-2 text-text py-3 px-10 text-sm font-medium 500:py-3 rounded flex items-center mt-8 mb-20 500:mt-14 750:px-16 1200:text-base 1200:w-[254px] justify-center "
            >
              <span className="mr-2 scale-[130%] translate-y-[-2px] 750:mr-4 1200:scale-[150%]">
                &larr;
              </span>{" "}
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
