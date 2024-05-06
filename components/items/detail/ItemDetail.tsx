"use client";

import React from "react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useAddData } from "@/hooks/useAddData";
import retreiveUserDataFromCookie from "@/helper/retreiveUserDataFromCookie";
import { useFetchData } from "@/hooks/useFetchData";
import { useUpdateData } from "@/hooks/useUpdateData";
import axiosInstance from "@/helper/axiosInstance";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  isActive: z.string(),
  permitted: z.string(),
  image: z.any().optional(),
  startBidDate: z.coerce.date(),
  endBidDate: z.coerce.date(),
  startingBid: z.number(),
  highestBid: z.number(),
  amount: z.string(),
});

const ItemDetail = ({ id }: any) => {
  const dataFromUserToken = retreiveUserDataFromCookie();

  const { data: itemData } = useFetchData({
    queryKey: ["itemData"],
    dataProtected: `items/${id}`,
  });

  const { data: highestBid } = useFetchData({
    queryKey: ["highestBid"],
    dataProtected: `bid/hisghest/${id}`,
  });

  const preloadedValues: any = {
    name: itemData?.data.name,
    description: itemData?.data.description,
    isActive: itemData?.data.isActive === true ? "ACTIVE" : "NOT ACTIVE",
    permitted:
      itemData?.data.status === "PERMITTED" ? "PERMITTED" : "NOT_PERMITTED",
    startBidDate: itemData?.data.startBidDate,
    endBidDate: itemData?.data.endBidDate,
    startingBid: itemData?.data.startingBid,
    highestBid: itemData?.data.highestBid,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preloadedValues || [],
  });

  const imageRef = form.register("image");

  const mutationBid = useAddData({
    queryKey: "bidData",
    dataProtected: `bids`,
  });

  const onSubmit = async (data: FieldValues) => {
    if (highestBid?.data.amount >= data.amount) {
      return toast.error("Bid amount must be higher than the current bid");
    }

    if (data.amount <= itemData?.data.amount) {
      return toast.error("Bid amount must be higher than the initial bid");
    }

    mutationBid.mutate({
      amount: data.amount,
      bidderId: dataFromUserToken.sub,
      itemId: id,
    });
  };

  return (
    <div className="p-4 sm:px-6 sm:py-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-2">
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>Product details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="name"
                            placeholder="RTX 4090 TI"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about this item"
                            className="resize-none"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>Put your bid</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="90000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex flex-row justify-end mb-2">
                    <Button type="submit">Submit bid</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Card className="mt-2 col-span-3 md:col-span-1">
                <CardHeader>
                  <CardTitle>Date auction</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="startBidDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start bid date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endBidDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End bid date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <Image
                    src={
                      itemData?.data.image !== null
                        ? itemData?.data.image
                        : "/placeholder.svg"
                    }
                    alt="placeholder"
                    width={300}
                    height={200}
                    className="object-cover text-center justify-center m-auto rounded-md"
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              readOnly
                              placeholder="shadcn"
                              {...imageRef}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ItemDetail;
