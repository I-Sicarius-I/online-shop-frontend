import { useEffect, useState } from "react"
import { useGetEmail } from "../../Hooks/userHooks"
import useAuth from "../Authentication/AuthContext"
import { useNavigate } from "react-router-dom"
import axios, { BASE_URL } from "../../api/axios"


const PRODUCT_URL = "/products"

const ProductForm = () => {


    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0.)


    const [userEmail, setUserEmail] = useState("")
    const {isLoggedIn, token} = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        const currEmail = useGetEmail()

        if(currEmail !== "")
        {
            setUserEmail(currEmail)
        }

        console.log(userEmail)
    }, [isLoggedIn])
    
    const handleSubmit = async(event) => {
        event.preventDefault()

        const data = {
            name: name,
            type: type,
            state: state,
            quantity: quantity,
            price: price,
            rating: '0',
            sellerId: userEmail
        }

        try{
            const res = await axios.post(BASE_URL + PRODUCT_URL,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if(res.status != 201)
            {
               console.log(res.data)
            }

            nav("/")
        }
        catch(e){
            console.error(e)
        }
    }

  return (
    <>
       {isLoggedIn ? (<div>
        <form class="flex flex-col justify-evenly" onSubmit={handleSubmit}>
            <input 
                class = "self-center"
                type="text"
                placeholder="Enter product name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input 
                class = "self-center"
                type="text"
                placeholder="Enter product type..."
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
            />
            <select class="self-center" name="state select" onChange={(e) => {setState(e.target.value); console.log(state)}}>
                <option value="new">New</option>
                <option value="rarely used">Rarely used</option>
                <option value="used">Used</option>
                <option value="damaged">Damaged</option>
            </select>
            <input 
                class = "self-center"
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />  
            <input 
                class = "self-center"
                type="number"
                placeholder="Enter product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <input 
                class = "self-center"
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <div class="flex flex-row justify-evenly">
                <button type="submit">Submit</button>
                <button onClick={() => nav("/")}>Cancel</button>
            </div>
        </form>
       </div>): (
        <div class="flex flex-col">
            <p>Users without account can't post product offers</p>
            <button onClick={() => nav("/")}>Get back to Home</button>
       </div>)} 
    </>
  )
}

export default ProductForm
