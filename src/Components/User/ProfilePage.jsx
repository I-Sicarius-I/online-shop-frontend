import { useEffect, useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import ProductsList from "../Products/ProductsList"
import { useGetEmail } from "../../Hooks/userHooks"
import ProfileEdit from "./ProfileEdit"


const ProfilePage = () => {
    const {username} = useParams()
    const email = useGetEmail()
    let data = useLoaderData()
    const [exists, setExists] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState({})


    useEffect(() => {
        setExists(data.status === 200)
    }, [])

    useEffect(() => {
        if(exists){
            setUser(data.data)
        }
    }, [exists])

  return (
    <div class="flex-col">{exists ? 
      (<div>
      <h1 class="font-bold text-3xl text-indigo-300">{user.username}'s profile page</h1>
      <h2>About:</h2>
      <p>{user.about}</p>
      {email === user.email && !isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
      {isEditing ? (<ProfileEdit user={user} isEditing={isEditing} setIsEditing={setIsEditing}/>) : (<>
        <h3>Products:</h3>
        <ProductsList email={user.email}/>
        <p>Contact info</p>
        <ul>
          <li>{user.email}</li>
        </ul>
      </>)}</div>) : (<p>ERROR 404: User does not exist</p>)}
      <a href="/">Go back to Home</a>
    </div>
  )
}

export default ProfilePage
