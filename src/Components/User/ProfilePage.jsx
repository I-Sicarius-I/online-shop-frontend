import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProductsList from "../Products/ProductsList"
import { useGetEmail } from "../../Hooks/userHooks"
import ProfileEdit from "./ProfileEdit"
import axios, { BASE_URL } from "../../api/axios"


const ProfilePage = () => {
    const {username} = useParams()
    const email = useGetEmail()
    const [exists, setExists] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const nav = useNavigate()


    useEffect(() => {
      const loadUser = async() => {
        try{
          const res = await axios.get(BASE_URL + "/users/" + email,{
            headers: {
              "Content-Type": "application/json"
            }
          })

          if(res.status !== 200)
          {
            setExists(false)
            setIsLoading(false)
            return
          }

          setUser(res.data)
          setExists(true)
          setIsLoading(false)
        }
        catch(e){
          console.error(e)
          setExists(false)
          setIsLoading(false)
        }
      }

      loadUser()
    }, [email])

  return (
    <div class="flex-col">{isLoading ? (
      <h1>Loading ...</h1>
    ) : (exists ? 
      (<div>
      <h1 class="font-bold text-3xl text-indigo-300">{user.username}'s profile page</h1>
      {user.about !== null && <h2>About:</h2>}
      <p>{user.about}</p>
      {email === user.email && 
        <div class="flex-row">
          {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
          <button class="m-2 bg-red-800 font-bold text-white" onClick={() => nav(`/user/${username}/delete`)}>Delete profile</button>
        </div>
      }
      {isEditing ? (<ProfileEdit user={user} isEditing={isEditing} setIsEditing={setIsEditing}/>) : (<>
        <ProductsList email={email}/>
        <a href="/add-product">Add Product</a>
        <p>Contact info</p>
        <ul>
          <li>{user.email}</li>
          <li>{user.city}</li>
        </ul>
      </>)}
      {user.email === email && <button onClick={() => nav(`/orders/${user.username}`)}>Your Orders</button>}
      </div>) : (<p>ERROR 404: User does not exist</p>))}
      <a href="/">Go back to Home</a>
    </div>
  )
}

export default ProfilePage
