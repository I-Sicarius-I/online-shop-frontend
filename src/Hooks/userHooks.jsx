import { jwtDecode } from "jwt-decode"

export const useGetEmail = () => {

    if (localStorage.hasOwnProperty("token"))
    {
        const token = localStorage.getItem("token")
        console.log(token)
        const decoded  = jwtDecode(token)

        return decoded.sub
    }
}