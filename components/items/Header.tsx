"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchData } from "@/hooks/useFetchData";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data } = useFetchData({
    queryKey: ["itemsData"],
    dataProtected: `items`,
    keep: true,
  });

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
              <Link href="/dashboard/users">Users</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>About this page</CardTitle>
              <CardDescription className="text-justify md:text-left text-balance leading-relaxed">
                The item data table page provides a centralized view of all
                items currently listed for auction within the platform. It
                offers users, including buyers and sellers, an organized and
                easily navigable interface to browse through available items,
                their details, and status.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={"/dashboard/items/add"}>Add Item</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Items</CardDescription>
              <CardTitle className="text-4xl">
                {data?.data.meta.activeItemCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total number of active items
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Permitted</CardDescription>
              <CardTitle className="text-4xl">
                {data?.data.meta.permittedItemCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total number of permitted items
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="overflow-hidden rounded-md"></div>
      </div>
    </main>
  );
};

export default Header;
