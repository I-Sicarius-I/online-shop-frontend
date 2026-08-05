import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios, { BASE_URL } from "../../api/axios"
import useAuth from "../Authentication/AuthContext"

const ProfileEdit = ({user, isEditing, setIsEditing}) => {
    const [username, setUsername] = useState(user.username)
    const [fname, setFname] = useState(user.fname)
    const [lname, setLname] = useState(user.lname)
    const [address, setAddress] = useState(user.address)
    const [city, setCity] = useState(user.city)
    const [code, setCode] = useState(user.code)
    const [about, setAbout] = useState(user.about)

    const nav = useNavigate()
    const {token} = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = {
            username: username,
            fname: fname,
            lname: lname,
            address: address,
            city: city,
            code: code,
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

    useEffect(() => {
        setUsername(user.username)
        setFname(user.fname)
        setLname(user.lname)
        setAddress(user.address)
        setCity(user.city)
        setCode(user.code)
        setAbout(user.about)
    }, [])


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
                placeholder='Enter first name...'
                value={fname}
                onChange={(event) => {setFname(event.target.value)}}
                required
            />
            <input 
                class="self-center"
                type="text" 
                placeholder='Enter last name...'
                value={lname}
                onChange={(event) => {setLname(event.target.value)}}
                required
            />
            <input 
                class="self-center"
                type="text" 
                placeholder='Enter address...'
                value={address}
                onChange={(event) => {setAddress(event.target.value)}}
                required
            />
            <input 
                class="self-center"
                type="text" 
                placeholder='Enter city name...'
                value={city}
                onChange={(event) => {setCity(event.target.value)}}
                required
            />
            <input 
                class="self-center"
                type="text" 
                placeholder='Enter code...'
                value={code}
                onChange={(event) => {setCode(event.target.value)}}
                required
            />
            <input 
                class="self-center"
                type="text" 
                placeholder="Enter about info..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            <button type="submit">Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEdit
