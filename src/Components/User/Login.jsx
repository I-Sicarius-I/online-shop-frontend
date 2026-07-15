import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Authentication/AuthContext";
import axios, { BASE_URL } from "../../api/axios";

const EMAIL_REGEX = /^.+\@.+\..+/;
const LOGIN_URL = "/auth/login"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkEmail, setCheckEmail] = useState(false)
    
    const {setIsLoggedIn, setToken} = useAuth()

    const nav = useNavigate()

    useEffect(() => {
        setCheckEmail(EMAIL_REGEX.test(email));
    }, [email])

    const handleLogin = async(e) => {
        e.preventDefault();

        const isEmailValid = checkEmail;

        if(!isEmailValid)
        {
            console.log("wrong email")
            return;
        }

        try{
            const res = await axios.post(BASE_URL + LOGIN_URL,
                {email: email, password: password},
                {
                    headers: {"Content-Type": "application/json"}
                }
            );

            if(res.status !== 200){
                throw new Error("status: " + res.data)
            }

            const token = res.data.token;

            setToken(token)
            setIsLoggedIn(true)

            nav("/")
        }
        catch(err)
        {
            console.log(err)
        }
    }

  return (
<div class="flex border-amber-500 border-solid border-2">
      <form onSubmit={handleLogin}>
            <div class = "flex flex-col justify-center align-middle">
                <input 
                    class="self-center"
                    type="text" 
                    placeholder='Enter email...'
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    required
                />
                <input 
                    class="self-center"
                    type="password" 
                    placeholder='Enter password...'
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    required
                />
            </div>
            <button class="m-2" type='submit'>Login</button>
            <button class="m-2" onClick={() => {nav("/")}}>Cancel</button>
        </form>
    </div>
  )
}

export default Login
