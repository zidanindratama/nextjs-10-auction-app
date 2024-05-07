"use client";
import Header from "@/components/dashboard/Header";
import ItemList from "@/components/dashboard/ItemList";
import Cookies from "js-cookie";

const page = () => {
  const refreshToken = Cookies.get();
  console.log(refreshToken);

  return (
    <>
      <Header />
      <ItemList />
    </>
  );
};

export default page;
