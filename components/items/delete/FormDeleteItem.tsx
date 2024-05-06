"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

const FormSchema = z.object({
  confirmDelete: z.boolean().default(false).optional(),
});

const FormDeleteItem = ({ id }: any) => {
  const dataFromUserToken = retreiveUserDataFromCookie();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmDelete: false,
    },
  });

  const mutationItem = useDeleteData({
    queryKey: "userData",
    dataProtected: `items/${id}`,
    backUrl: "/dashboard/items",
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(dataFromUserToken.role);
    if (data.confirmDelete === true) {
      await mutationItem.mutate();
    } else {
      toast.error("You have to agree with our terms");
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Delete item</CardTitle>
        <CardDescription>
          Keep in mind that deleting this item will permanently remove all of
          this item information, including saved data and preferences, and this
          action cannot be undone.
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
                    <FormLabel>I agree</FormLabel>
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

export default FormDeleteItem;
