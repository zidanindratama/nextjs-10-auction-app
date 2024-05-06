import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Main</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-5">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>About this app</CardTitle>
              <CardDescription className="text-justify md:text-left max-w-xl text-balance leading-relaxed">
                The Auction App is a web application designed to facilitate
                online auctions. It provides a platform where users can list
                items for auction and participate in bidding.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open</Button>
                </DialogTrigger>
                <DialogContent className="w-80 rounded-md md:w-full">
                  <DialogHeader>
                    <DialogTitle>Kelompok 3 | PBO</DialogTitle>
                    <DialogDescription>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>NPM</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium capitalize text-left">
                                Daffa Ramzy Saputra
                              </div>
                            </TableCell>
                            <TableCell>50422371</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium capitalize text-left">
                                Dimas Arya Sauki Alaudin
                              </div>
                            </TableCell>
                            <TableCell>50422428</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium capitalize text-left">
                                Muhamad Zidan Indratama
                              </div>
                            </TableCell>
                            <TableCell>50422968</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium capitalize text-left">
                                Muhammad Iqbal
                              </div>
                            </TableCell>
                            <TableCell>51422078</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium capitalize text-left">
                                Zaidaan Syarifullah
                              </div>
                            </TableCell>
                            <TableCell>51422670</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium capitalize text-left">
                                Zulfa Aulia Hanafi
                              </div>
                            </TableCell>
                            <TableCell>51422690</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Sellers</CardDescription>
              <CardTitle className="text-4xl">18</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Buyers</CardDescription>
              <CardTitle className="text-4xl">42</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="pb-2">
              <CardDescription>Items</CardDescription>
              <CardTitle className="text-4xl">87</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="overflow-hidden rounded-md"></div>
      </div>
    </main>
  );
};

export default Header;
