import { useEffect, useState } from "react"
// import { useGetEmail } from "../../Hooks/userHooks"
import useAuth from "../Authentication/AuthContext"
import { useNavigate } from "react-router-dom"
import axios, { BASE_URL } from "../../api/axios"
import { useGetEmail } from "../../Hooks/userHooks"


const PRODUCT_URL = "/products"

const ProductForm = ({id = null, product=null}) => {

    const ProductState = {
        NEW: "New",
        RARELY_USED: "Rarely used",
        USED: "Used",
        DAMAGED: "Damaged"
    }
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [state, setState] = useState(ProductState.NEW)
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0.)

    const email = useGetEmail()


    // const [userEmail, setUserEmail] = useState("")
    const {isLoggedIn, token} = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        const setDefaults = () => {
            if(typeof id !== "undefined" && id !== null){
                setName(product.name)
                setType(product.type)
                setState(product.state)
                setDescription(product.description)
                setQuantity(product.quantity)
                setPrice(product.price)
            }
        }
        setDefaults()
    }, [])

    // useEffect(() => {
    //     const func = () => {
    //         const currEmail = useGetEmail()

    //         if(currEmail !== "")
    //         {
    //             setUserEmail(currEmail)
    //         }
    //     }
    //     func()
    // }, [isLoggedIn])
    
    const handleSubmit = async(event) => {
        event.preventDefault()

        const data = {
            name: name,
            type: type,
            description: description,
            state: state,
            quantity: quantity,
            price: price,
            rating: '0',
            sellerId: email
        }

        try{
            const res = (id === null || typeof id === "undefined") ? await axios.post(BASE_URL + PRODUCT_URL,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ) : await axios.patch(BASE_URL + PRODUCT_URL + "/" + id,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if(res.status != 201 || res.status != 200)
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
                <option value={ProductState.NEW}>New</option>
                <option value={ProductState.RARELY_USED}>Rarely used</option>
                <option value={ProductState.USED}>Used</option>
                <option value={ProductState.DAMAGED}>Damaged</option>
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
            <button class="border-2 border-indigo-300" onClick={() => nav("/")}>Get back to Home</button>
       </div>)} 
    </>
  )
}

export default ProductForm
