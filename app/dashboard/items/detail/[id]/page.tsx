import Header from "@/components/items/detail/Header";
import ItemDetail from "@/components/items/detail/ItemDetail";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Header id={params.id} />
      <ItemDetail id={params.id} />
    </>
  );
};

export default page;
