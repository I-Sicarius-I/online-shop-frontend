import { useEffect, useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import ProductsList from "../Products/ProductsList"


const ProfilePage = () => {
    const {username} = useParams()
    let data = useLoaderData()
    const [exists, setExists] = useState(false)
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
    <div class="flex-col">
      <h1 class="font-bold text-3xl text-indigo-300">{user.username}'s profile page</h1>
      <h3>Products:</h3>
      <ProductsList email={user.email}/>
      <p>Contact info</p>
      <ul>
        <li>{user.email}</li>
      </ul>
      <a href="/">Go back to Home</a>
    </div>
  )
}

export default ProfilePage
