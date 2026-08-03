import { useEffect, useState } from "react"
import ProductsList from "./Products/ProductsList"
import useAuth from "./Authentication/AuthContext"
import { useNavigate } from "react-router-dom"
import { useGetEmail } from "../Hooks/userHooks"
import axios, { BASE_URL } from "../api/axios"



const Home = () => {

    const {isLoggedIn, setIsLoggedIn} = useAuth()

    const [username, setUsername] = useState("")

    const email = useGetEmail()
    const nav = useNavigate()
    const loadUser = async() => {
        try{
            if(isLoggedIn){
                const res = await axios.get(BASE_URL + "/users/" + email,
                    {
                        headers:{
                            "Content-Type": "application/json"
                        }
                    })
                
                if(res.status !== 200){
                    return 
                }
                
                setUsername(res.data.username)
            }
        }
        catch(e)
        {
            console.error(e)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])


    return (<div class="flex-col">
        <div class="flex-row flex-1 justify-between">
            <h1>Home</h1>
            {!isLoggedIn ? 
                (<div class="flex-row self-end">
                    <button class="m-2 border-sky-900 border-2 rounded-xl bg-sky-950 font-bold text-2xl text-indigo-600" onClick={() => nav("/register")}>Register</button>
                    <button class="m-2 border-sky-900 border-2 rounded-xl bg-sky-950 font-bold text-2xl text-indigo-600" onClick={() => nav("/login")}>Login</button>
                </div>
                ) : (
                    <div class="flex-row">
                        <button class="m-2 border-sky-900 border-2 rounded-xl bg-sky-950 font-bold text-2xl text-indigo-600" onClick={() => nav(`/user/${username}`)}>Profile</button>
                    </div>
                )}

        </div>
        {isLoggedIn && (<p>
            Successfully logged in :D
        </p>)}
        {isLoggedIn && <button type="submit" onClick={() => {localStorage.clear(); setIsLoggedIn(false)}}>
            Log out</button>}
        <ProductsList/>
    </div>)
}

export default Home