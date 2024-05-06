"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { DataTable } from "../DataTable";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { itemcColumns } from "./ItemDataDependencies";

const ItemDataTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const count = searchParams.get("count") || "10";
  const limit = typeof count === "string" ? parseInt(count) : 10;

  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isSuccess, refetch, isRefetching } = useFetchData({
    queryKey: ["itemsData", page],
    dataProtected: `items?pgNum=${page}&pgSize=${count}&name=${searchValue}`,
    keep: true,
  });

  const handleSearch = () => {
    refetch();
    setSearchValue("");
  };

  const pageCount = Math.ceil(data?.data.meta.count / limit);
  console.log(pageCount);

  return (
    <Suspense>
      <div className="p-4 sm:px-6 sm:py-0">
        {(isLoading || isRefetching) && <Skeleton className="w-full h-96" />}
        {isSuccess && !isRefetching && (
          <>
            <DataTable
              propsData={data?.data.items}
              columnsData={itemcColumns}
              pageCount={pageCount}
            >
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Filter full name..."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button type="submit" onClick={handleSearch}>
                  Submit
                </Button>
              </div>
            </DataTable>
          </>
        )}
      </div>
    </Suspense>
  );
};

export default ItemDataTable;
