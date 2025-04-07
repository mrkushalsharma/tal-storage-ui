import { jwtDecode } from "jwt-decode";

export const getUser = () => {
    return jwtDecode(localStorage.getItem("token") ?? "");
}