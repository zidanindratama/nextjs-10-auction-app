"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchData } from "@/hooks/useFetchData";
import { Item } from "../items/ItemDataDependencies";
import Image from "next/image";
import { convertToRupiah } from "@/helper/convertToRupiah";
import { formatDate } from "@/helper/formatDate";
import { Button } from "../ui/button";
import Link from "next/link";

const ItemList = () => {
  const nowDate = new Date();

  const { data: itemsData, isStale } = useFetchData({
    queryKey: ["itemsData"],
    dataProtected: `items?isActive=true&status=PERMITTED`,
  });

  return (
    <div className="p-4 sm:px-6 sm:py-0 grid grid-cols-6 md:grid-cols-4 gap-4">
      {itemsData?.data.items.map((item: Item) => {
        // @ts-ignore
        const date = `${formatDate(item.startBidDate)} - ${formatDate(
          // @ts-ignore
          item.endBidDate
        )}`;

        return (
          <Card key={item.id} className="shadow-sm col-span-3 md:col-span-1">
            <Image
              src={item.image !== null ? item.image : "./placeholder.svg"}
              width={800}
              height={800}
              className="object-cover h-48 w-full rounded-md"
              alt={item.name}
            />
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className="text-emerald-400 font-bold text-lg">
                {convertToRupiah(item.startingBid)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h1>{date}</h1>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/dashboard/items/detail/${item.id}`}>
                  See item
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ItemList;
