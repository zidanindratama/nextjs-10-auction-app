import Header from "@/components/items/Header";
import ItemDataTable from "@/components/items/ItemDataTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Header />
      <Suspense>
        <ItemDataTable />
      </Suspense>
    </>
  );
};

export default page;
