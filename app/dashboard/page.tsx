"use client";
import Header from "@/components/dashboard/Header";
import ItemList from "@/components/dashboard/ItemList";
import axios from "axios";
import Cookies from "js-cookie";

const page = () => {
  return (
    <>
      <Header />
      <ItemList />
    </>
  );
};

export default page;
