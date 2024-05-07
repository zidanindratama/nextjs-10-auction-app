"use client";
import Header from "@/components/dashboard/Header";
import ItemList from "@/components/dashboard/ItemList";
import Cookies from "js-cookie";

const page = () => {
  const refreshToken = Cookies.get("refreshToken");
  const token = refreshToken?.replace(/"/g, ""); // Removing all occurrences of double quotes
  console.log(token);

  return (
    <>
      <Header />
      <ItemList />
    </>
  );
};

export default page;
