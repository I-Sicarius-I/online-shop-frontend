import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../Authentication/AuthContext"
import axios, { BASE_URL } from "../../api/axios"
import { useGetEmail } from "../../Hooks/userHooks"


const DeleteProfile = () => {
    const {username} = useParams()
    const email = useGetEmail()
    const {token, setToken, setIsLoggedIn} = useAuth()
    const nav = useNavigate()

    const handleDelete = async() => {
        try{
        const res = await axios.delete(BASE_URL + "/users/" + email,
            {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
            })

            if(res.status !== 204){
            return
            }
            
            setIsLoggedIn(false)
            setToken("")
            localStorage.clear()
            nav("/")
        } catch(e){
        console.error(e)
        }
    }

  return (
    <div class="flex-col">
        <h1>Do you want to delete your profile?</h1>
        <button class="m-2 bg-green-500 font-bold text-white" type="submit" onClick={() => handleDelete()}>Delete account</button>
        <button class="m-2 bg-red-800 font-bold text-white" onClick={() => nav(`/user/${username}`)}>Cancel</button>
    </div>
  )
}

export default DeleteProfile
