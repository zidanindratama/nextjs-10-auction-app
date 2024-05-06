import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const retreiveUserDataFromCookie = () => {
  const token = Cookies.get("accessToken");

  if (!token) return;

  const decode: any = jwtDecode(token);
  return decode;
};

export default retreiveUserDataFromCookie;
