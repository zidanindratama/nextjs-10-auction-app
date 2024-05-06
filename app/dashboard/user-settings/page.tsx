import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FormDeleteAccount from "@/components/user-settings/FormDeleteAccount";
import FormProfile from "@/components/user-settings/FormProfile";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/user-settings">Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-4">
        <FormProfile />
      </div>
    </main>
  );
};

export default page;
