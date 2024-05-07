"use client";
import Header from "@/components/dashboard/Header";
import ItemList from "@/components/dashboard/ItemList";
import axios from "axios";
import Cookies from "js-cookie";

const page = () => {
  const refreshToken = Cookies.get("refreshToken");

  const token = refreshToken?.replace(/"/g, ""); // Removing all occurrences of double quotes

  const testRefresh = async () => {
    try {
      const resToken = await axios.post(
        "http://localhost:3100/auth/refresh-token",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 onClick={testRefresh}>test</h1>
      <Header />
      <ItemList />
    </>
  );
};

export default page;
