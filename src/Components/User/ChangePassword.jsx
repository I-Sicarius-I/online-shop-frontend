import { useState } from "react"
import { useGetEmail } from "../../Hooks/userHooks";
import axios, { BASE_URL } from "../../api/axios";
import useAuth from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");

    const email = useGetEmail();
    const {token} = useAuth();
    const nav = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()

        if(newPass !== confirm){
            alert("NEW PASSWORD DOES NOT MATCH REPEATED PASSWORD");
            setNewPass("");
            setConfirm("");
            return;
        }

        const data = {
            oldPassword: oldPass,
            newPassword: newPass
        }
        console.log(email)
        try{
        const res = await axios.patch(`${BASE_URL}/users/passwordChange/${email}`, 
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        if(res.status !== 200){
            alert(`ERROR ${res.status}\n` + res.data)
        }

        alert("Success!")
        setTimeout(() => {
            nav(`/user/${email}`)
        }, 500)}
        catch(e){
            alert(e.message)
        }
    }
  
    return (
    <div class="flex-col justify-items: space-around">
      <h2>Change password</h2>
      <form onSubmit={handleSubmit}>
        <div class="flex-1">
            <label htmlFor="oldPassInput" class="display: block">Type old password</label>
            <input 
                name="oldPassInput"
                type="password"
                value={oldPass} 
                placeholder="Password..."
                onChange={(e) => setOldPass(e.target.value)}
                required
            />
        </div>
        <div class="flex-1">
            <label htmlFor="oldPassInput" class="display: block">Type new password</label>
            <input 
                name="oldPassInput"
                type="password"
                value={newPass} 
                placeholder="Password..."
                onChange={(e) => setNewPass(e.target.value)}
                required
            />
        </div>
        <div class="flex-1">
            <label htmlFor="oldPassInput"class="display: block">Confirm new password</label>
            <input 
                name="oldPassInput"
                type="password"
                value={confirm} 
                placeholder="Password..."
                onChange={(e) => setConfirm(e.target.value)}
                required
            />
        </div>
        <button type="submit" class="m-2">Submit changes</button>
        <button class="flex-1" onClick={()=>nav(`/user/${email}`)}>Cancel</button>
      </form>
    </div>
  )
}

export default ChangePassword
