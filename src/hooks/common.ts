/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

export const getUser: any = () => {
    return jwtDecode(localStorage.getItem("token") ?? "");
}