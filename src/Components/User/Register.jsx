import { useEffect, useState } from 'react'
import useAuth from '../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/axios'
import axios from 'axios';


const EMAIL_REGEX = /^.+\@.+\..+/;
const REGISTER_URL = "/auth/register"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [checkEmail, setCheckEmail] = useState(false);

    const {setIsLoggedIn, setToken} = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        setCheckEmail(EMAIL_REGEX.test(email));
    }, [email])

    const handleRegister = async(event) => {
        event.preventDefault();

        const em_check = checkEmail;

        if(!em_check)
        {
            // add error message
            return;
        }
        if(password !== confirm){
            console.log("passwords don't match")
            return;
        }

        try{

            const res = await axios.post(BASE_URL + REGISTER_URL, 
                {
                    email: email,
                    username: username,
                    fname: fname,
                    lname: lname,
                    address: address,
                    city: city,
                    code: code,
                    password: password
                },
                {
                  headers:    {
                    "Content-Type": "application/json",
                }
                }
            )

            if (res.status !== 201){
                console.log(res)
                return
            }


            const token = res.data.token
            localStorage.setItem("token", token);

            setToken(token);
            setIsLoggedIn(true);
            
            nav("/")
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div class="flex flex-col border-amber-500">
      <form onSubmit={handleRegister}>
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
                    type="text" 
                    placeholder='Enter username...'
                    value={username}
                    onChange={(event) => {setUsername(event.target.value)}}
                    required
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
                    type="password" 
                    placeholder='Enter password...'
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    required
                />
                <input 
                    class="self-center"
                    type="password" 
                    placeholder='Repeat password...'
                    value={confirm}
                    onChange={(event) => {setConfirm(event.target.value)}}
                    required
                />
            </div>
            <button class="m-2"type='submit'>Register</button>
            <button onClick={() => {nav("/")}}>Cancel</button>
        </form>
    </div>
  )
}

export default Register

