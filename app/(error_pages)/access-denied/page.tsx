import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center m-auto space-y-6">
      <div className="text-[35px] md:text-[48px] font-semibold text-center">
        Access Denied
      </div>
      <Image
        src={"/access-denied.gif"}
        alt="access denied"
        width={300}
        height={300}
      />
      <Link href="/dashboard">
        <Button className="text-[14px]">Back to Home Page</Button>
      </Link>
    </div>
  );
};

export default page;
