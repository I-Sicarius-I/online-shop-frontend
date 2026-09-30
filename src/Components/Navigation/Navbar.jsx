
import { useNavigate } from "react-router-dom"
import useAuth from "../Authentication/AuthContext"
import { useEffect, useState } from "react";
import axios, { BASE_URL } from "../../api/axios";
import { useGetEmail } from "../../Hooks/userHooks";


const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const email = useGetEmail();

  useEffect(() => {
        const loadUser = async() => {
            try{
                if(isLoggedIn){
                    const res = await axios.get(BASE_URL + "/users" + (email !== "" ? "/" + email : ""),
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
        loadUser()
    }, [isLoggedIn])

  return (
    <div class="flex-row mb-15">
      <div class="navbar">
          <h2><a href="/">Home</a></h2>
          <div class="flex-row justify-end ml-10">
            {isLoggedIn ? (<>
                <button onClick={() => nav(`/user/${username}`)}>{username}'s Profile</button>
                <button type="submit" onClick={() => {setIsLoggedIn(false); localStorage.clear();}}>Log out</button>
            </>) : (<>
              <button onClick={() => nav("/register")}>Register</button>
              <button onClick={() => nav("/login")}>Login</button>
            </>)
            }
          </div>
      </div>
    </div>
  )
}

export default Navbar
