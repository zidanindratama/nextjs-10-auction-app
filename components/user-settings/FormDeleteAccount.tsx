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
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteData } from "@/hooks/useDeleteData";
import retreiveUserDataFromCookie from "@/helper/retreiveUserDataFromCookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "@/helper/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

const FormSchema = z.object({
  confirmDelete: z.boolean().default(false).optional(),
});

const FormDeleteAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dataFromUserToken = retreiveUserDataFromCookie();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmDelete: false,
    },
  });

  const mutationSettings = useDeleteData({
    queryKey: "yourData",
    dataProtected: `users/${dataFromUserToken?.sub}`,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.confirmDelete === true) {
      if (dataFromUserToken.role !== "ADMINISTRATOR") {
        toast.error("Only admin can delete the user!");
      } else {
        const deleteResponse = await axiosInstance.delete(
          `/protected/users/${dataFromUserToken?.sub}`
        );
        if (deleteResponse?.data.statusCode === 200) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("userData");
          toast.success("Successfully logged out!");
        } else {
          toast.error("Something went wrong!");
        }
        router.push("/");
      }
    } else {
      toast.error("You have to agree with our terms");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete account</CardTitle>
        <CardDescription>
          Keep in mind that deleting this account will permanently remove all of
          this account information, including saved data and preferences, and
          this action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="confirmDelete"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Use different settings for my mobile devices
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormDeleteAccount;
