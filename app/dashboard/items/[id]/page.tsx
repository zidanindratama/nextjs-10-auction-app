import FormDeleteItem from "@/components/items/delete/FormDeleteItem";
import FormEditItem from "@/components/items/edit/FormEditItem";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mt-8 p-4 sm:px-6 sm:py-0">
      <FormEditItem id={params.id} />
      <FormDeleteItem id={params.id} />
    </div>
  );
};

export default page;
