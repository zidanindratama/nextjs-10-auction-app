"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import retreiveUserDataFromCookie from "@/helper/retreiveUserDataFromCookie";
import { useFetchData } from "@/hooks/useFetchData";
import { useUpdateData } from "@/hooks/useUpdateData";
import FormDeleteAccount from "./FormDeleteAccount";
import { Textarea } from "../ui/textarea";

enum Role {
  BUYER = "BUYER",
  SELLER = "SELLER",
  ADMINISTRATOR = "ADMINISTRATOR",
}

const formSchema = z.object({
  role: z.nativeEnum(Role),
  isActive: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.any().optional(),
  bio: z.string(),
});

const FormProfile = () => {
  const dataFromUserToken = retreiveUserDataFromCookie();

  const { data: yourData, isStale } = useFetchData({
    queryKey: ["yourData"],
    dataProtected: `users/${dataFromUserToken?.sub}`,
  });

  const preLoadValues = {
    role: yourData?.data.role,
    isActive: yourData?.data.isActive === true ? "ACTIVE" : "NOT ACTIVE",
    email: yourData?.data.email,
    name: yourData?.data.name,
    bio: yourData?.data.bio,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preLoadValues || [],
  });

  const imageRef = form.register("image");

  const mutationSettings = useUpdateData({
    queryKey: "yourData",
    dataProtected: `users/${yourData?.data.id}`,
  });

  const onSubmit = async (data: FieldValues) => {
    const form = new FormData();
    console.log(data.image[0]);

    if (data.isActive === "ACTIVE") {
      data.isActive = true;
    } else {
      data.isActive = false;
    }

    form.append("name", data.name);
    form.append("email", data.email);
    form.append("role", data.role);
    form.append("isActive", data.isActive);
    form.append("bio", data.bio);

    if (data.image[0] !== undefined) {
      form.append("image", data.image[0]);
    }

    mutationSettings.mutate(form);
  };

  return !isStale ? (
    "test"
  ) : (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-end mb-4">
            <Button type="submit">Save changes</Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-3 md:col-span-2">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="zidan@gmail.com"
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="zidanindratama" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
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
            <Card className="col-span-3 md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Account type</CardTitle>
                <CardDescription>Your account type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <>
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={yourData?.data.role !== "ADMINISTRATOR"}
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={yourData?.data.role === "SELLER"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SELLER">Seller</SelectItem>
                            <SelectItem value="BUYER">Buyer</SelectItem>
                            {yourData?.data.role === "ADMINISTRATOR" && (
                              <SelectItem value="ADMINISTRATOR">
                                Administrator
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
      <FormDeleteAccount />
    </>
  );
};

export default FormProfile;
