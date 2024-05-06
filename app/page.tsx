import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center m-auto space-y-6">
      <div className="text-[35px] md:text-[48px] font-semibold text-center">
        Welcome to the auction app
      </div>
      <Image src={"/home.gif"} alt="home" width={300} height={300} />
      <Link href="/sign-in">
        <Button className="text-[14px]">Sign in</Button>
      </Link>
    </div>
  );
};

export default page;
