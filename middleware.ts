import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const cookieStore = cookies();

  const authRoutes = ["/sign-up", "/sign-in"];

  const baseRoutes = ["/dashboard"];

  const commonAdminAndSellerRoutes = ["/dashboard/items"];

  const buyerRoutes = ["/test/buyer"];

  const sellerRoutes = ["/test/seller"];

  const adminRoutes = ["/dashboard/users"];

  const accessToken = await cookieStore.get("accessToken");

  //  if user has accessToken and want to access authRoute then redirect to the dashboard
  if (accessToken && authRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  //  if user doean't has  accessToken and want to access protectedRoute then redirect to homepage
  if (
    !accessToken &&
    (baseRoutes.includes(pathname) ||
      buyerRoutes.includes(pathname) ||
      sellerRoutes.includes(pathname) ||
      adminRoutes.includes(pathname) ||
      commonAdminAndSellerRoutes.includes(pathname) ||
      pathname.startsWith("/dashboard"))
  ) {
    url.pathname = "/sign-up";
    return NextResponse.redirect(url);
  }

  if (accessToken) {
    const user: any = jwtDecode(accessToken?.value as string);
    url.pathname = "/access-denied";

    // Kalo rolenya ADMINISTRATOR dan SELLER, terus mau akses buyerRoutes. Redirect ke /access-denied
    if (
      (user.role === "ADMINISTRATOR" || user.role === "SELLER") &&
      buyerRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(url);
    }

    // Kalo rolenya ADMINISTRATOR dan BUYER, terus mau akses sellerRoutes. Redirect ke /access-denied
    if (
      (user.role === "ADMINISTRATOR" || user.role === "BUYER") &&
      sellerRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(url);
    }

    // Kalo rolenya BUYER dan SELLER, terus mau akses adminRoutes. Redirect ke /access-denied
    if (
      (user.role === "BUYER" || user.role == "SELLER") &&
      adminRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(url);
    }
  }
}
