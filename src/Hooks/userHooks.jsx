import { jwtDecode } from "jwt-decode"

export const useGetEmail = () => {

    if (Object.prototype.hasOwnProperty.call(localStorage, "token"))
    {
        const token = localStorage.getItem("token")
        console.log(token)
        const decoded  = jwtDecode(token)

        return decoded.sub
    }

    return "";
}