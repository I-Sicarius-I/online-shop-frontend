import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios, { BASE_URL } from "../../api/axios"
import useAuth from "../Authentication/AuthContext"

const ProfileEdit = ({user, isEditing, setIsEditing}) => {
    const [username, setUsername] = useState(user.username)
    const [about, setAbout] = useState(user.about)

    const nav = useNavigate()
    const {token} = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = {
            username: username,
            about: about
        }

        try{
            const res = await axios.patch(BASE_URL + "/users/" + user.email,
                data,
                {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if(res.status !== 200)
            {
                console.error(res.data)
                return
            }

            setIsEditing(!isEditing)
            nav("/user/" + res.data.username)
        }
        catch(e){
            console.error(e)
        }
    }

  return (
    <div class="flex-col">
      <form onSubmit={handleSubmit}>
        <div class="flex-col">
            <input 
                class="self-center"
                type="text" 
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                class="self-center"
                type="text" 
                placeholder="Enter about info..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            <button type="submit">Save</button>
            <button onClick={() => nav(`/user/${user.username}`)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEdit
