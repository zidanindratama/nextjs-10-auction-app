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
import { convertToRupiah } from "@/helper/convertToRupiah";
import retreiveUserDataFromCookie from "@/helper/retreiveUserDataFromCookie";
import { useFetchData } from "@/hooks/useFetchData";
import Link from "next/link";
import React from "react";

const Header = ({ id }: any) => {
  const dataFromUserToken = retreiveUserDataFromCookie();

  const { data: highestBid, isSuccess: successHighest } = useFetchData({
    queryKey: ["highestBid"],
    dataProtected: `bids/highest/${id}`,
  });

  const { data: yourData, isSuccess: successYouData } = useFetchData({
    queryKey: ["yourData"],
    dataProtected: `users/${dataFromUserToken.sub}`,
  });

  const { data: item, isSuccess: successItem } = useFetchData({
    queryKey: ["itemData"],
    dataProtected: `items/${id}`,
  });

  console.log(item?.data.endBidDate);
  console.log(new Date() > new Date(item?.data.endBidDate));
  console.log(new Date(item?.data.endBidDate));

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
              <Link href="/dashboard">item</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>About this page</CardTitle>
              <CardDescription className="text-justify md:text-left max-w-xl text-balance leading-relaxed">
                An auction is a competitive sale where items go to the highest
                bidder. Bidders make escalating offers until one wins the item
                or service, making auctions an efficient way to determine value
                and maximize returns for sellers.
              </CardDescription>
            </CardHeader>
            <CardFooter></CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Initial price</CardDescription>
              <CardTitle className="text-4xl truncate">
                {successItem && convertToRupiah(item?.data.startingBid)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                The "start bid price" represents the initial amount set for
                bidding on an item, serving as the baseline from which potential
                buyers can place their bids.
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Highest bid price</CardDescription>
              <CardTitle className="text-4xl truncate">
                {new Date() > new Date(item?.data.endBidDate) &&
                highestBid?.data.amount > 0
                  ? convertToRupiah(highestBid?.data.amount)
                  : "0"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {highestBid?.data.amount > 0 ? (
                <div className="text-xs text-muted-foreground">
                  Congratulations to{" "}
                  <span className="font-bold">
                    {highestBid?.data.bidder.name}
                  </span>{" "}
                  for being the highest bidder
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  There&apos;s no highest bidder yet
                </div>
              )}
            </CardContent>
            {highestBid?.data.bidder.name === yourData?.data.name && (
              <CardFooter>
                {new Date() > new Date(item?.data.endBidDate) === true ? (
                  <Button>Pay the item!</Button>
                ) : null}
              </CardFooter>
            )}
          </Card>
        </div>
        <div className="overflow-hidden rounded-md"></div>
      </div>
    </main>
  );
};

export default Header;
