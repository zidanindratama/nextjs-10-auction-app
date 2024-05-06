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
});

const FormEditItem = ({ id }: any) => {
  const dataFromUserToken = retreiveUserDataFromCookie();

  const { data: itemData } = useFetchData({
    queryKey: ["itemData"],
    dataProtected: `items/${id}`,
  });

  const { data: highestBid } = useFetchData({
    queryKey: ["highestBid"],
    dataProtected: `bids/highest/${id}`,
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
    highestBid: highestBid?.data.amount,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preloadedValues || [],
  });

  const imageRef = form.register("image");

  const mutationItem = useUpdateData({
    queryKey: "itemData",
    dataProtected: `items/${id}`,
    backUrl: `/dashboard/items/${id}`,
  });

  const onSubmit = async (data: FieldValues) => {
    const form = new FormData();

    if (data.isActive === "ACTIVE") {
      data.isActive = true;
    } else {
      data.isActive = false;
    }

    if (data.startBidDate > data.endBidDate) {
      toast.error("startBidDate should not after endBidDate");
    } else {
      form.append("name", data.name);
      form.append("sellerId", itemData?.data.seller.id);
      form.append("description", data.description);
      form.append("isActive", data.isActive);
      form.append("status", data.permitted);
      form.append("startBidDate", data.startBidDate.toISOString()); // Convert date to ISO string
      form.append("endBidDate", data.endBidDate.toISOString()); // Convert date to ISO string
      form.append("startingBid", data.startingBid);
      form.append("highestBid", preloadedValues.highestBid);

      if (data.image[0] !== undefined) {
        form.append("image", data.image[0]);
      }

      mutationItem.mutate(form);
    }
  };

  return (
    <div>
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
              <Link href="/dashboard/items">Items</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Detail</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-end mb-2">
            <Button type="submit">Save changes</Button>
          </div>
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card className="mt-2 col-span-3 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Bid auction</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="startingBid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting bid</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="15000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="highestBid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Highest bid</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="10000"
                              {...field}
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle>Product type</CardTitle>
                  <CardDescription>Your item&apos;s type</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified status to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="NOT ACTIVE">
                              Not Active
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permitted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permitted</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={dataFromUserToken.role !== "ADMINISTRATOR"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified permitted to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PERMITTED">Permitted</SelectItem>
                            <SelectItem value="NOT_PERMITTED">
                              Not Permitted
                            </SelectItem>
                          </SelectContent>
                        </Select>
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

export default FormEditItem;
