import Header from "@/components/users/Header";
import UserDataTable from "@/components/users/UserDataTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Header />
      <Suspense>
        <UserDataTable />
      </Suspense>
    </>
  );
};

export default page;
