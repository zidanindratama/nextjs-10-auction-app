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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchData } from "@/hooks/useFetchData";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data } = useFetchData({
    queryKey: ["usersData"],
    dataProtected: `users`,
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
                The auction platform serves three key roles: buyers, sellers,
                and administrators. Buyers can bid on items, sellers list their
                items for auction, and admins oversee the platform's operation
                and user management.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open</Button>
                </DialogTrigger>
                <DialogContent className="w-80 rounded-md md:w-full">
                  <DialogHeader>
                    <DialogTitle>Kelompok 3 | PBO</DialogTitle>
                    <DialogDescription>test</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Sellers</CardDescription>
              <CardTitle className="text-4xl">
                {data?.data.meta.sellerCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total number of active sellers
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Buyers</CardDescription>
              <CardTitle className="text-4xl">
                {data?.data.meta.buyerCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total number of active buyers
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
