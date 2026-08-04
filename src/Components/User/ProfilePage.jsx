import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import ProductsList from "../Products/ProductsList"
import { useGetEmail } from "../../Hooks/userHooks"
import ProfileEdit from "./ProfileEdit"
import axios, { BASE_URL } from "../../api/axios"
import useAuth from "../Authentication/AuthContext"


const ProfilePage = () => {
    const {token} = useAuth()
    const {username} = useParams()
    const email = useGetEmail()
    let data = useLoaderData()
    let user = data.data
    const [exists, setExists] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const nav = useNavigate()
    

    useEffect(() => {
        setExists(data.status === 200)
    }, [])

  return (
    <div class="flex-col">{exists ? 
      (<div>
      <h1 class="font-bold text-3xl text-indigo-300">{user.username}'s profile page</h1>
      <h2>About:</h2>
      <p>{user.about}</p>
      {email === user.email && 
        <div class="flex-row">
          {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
          <button class="m-2 bg-red-800 font-bold text-white" onClick={() => nav(`/user/${username}/delete`)}>Delete profile</button>
        </div>
      }
      {isEditing ? (<ProfileEdit user={user} isEditing={isEditing} setIsEditing={setIsEditing}/>) : (<>
        <ProductsList email={data.data.email}/>
        <p>Contact info</p>
        <ul>
          <li>{user.email}</li>
          <li>{user.city}</li>
        </ul>
      </>)}</div>) : (<p>ERROR 404: User does not exist</p>)}
      <a href="/">Go back to Home</a>
    </div>
  )
}

export default ProfilePage
