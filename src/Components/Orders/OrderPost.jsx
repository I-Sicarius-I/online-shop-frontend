import { useEffect, useState } from "react"
import { useGetEmail } from "../../Hooks/userHooks"
import axios, { BASE_URL } from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../Authentication/AuthContext"


const OrderPost = () => {
    const email = useGetEmail()
    const {token} = useAuth()
    const {productId} = useParams()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState({})

    const nav = useNavigate()

    const loadProduct = async() => {
        try{
            const res = await axios.get(BASE_URL + "/products/" + productId,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if(res.status !== 200)
            {
                console.error(res.data)
                return
            }

            setProduct(res.data)
        }
        catch(e)
        {
            console.error(e)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const date = new Date()

            const res = await axios.post(BASE_URL + "/orders",
                {
                    quantity: quantity,
                    dateOrdered: date,
                    dateShipped: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
                    dateReceived: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2),
                    buyerId: email,
                    productId: product.id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            
            if(res.status !== 201){
                console.error(res.data)
                return
            }

            nav("/")
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        loadProduct()
    }, [])

    useEffect(() => {
        if(quantity < 1){
            setQuantity(1)
        }
        if(quantity > product.quantity){
            setQuantity(product.quantity)
        }
    }, [quantity])

  return (
    <div>
      <h1>Buy {product.name}</h1>
      <form onSubmit={handleSubmit}>
        <input 
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
        />
        <button type="submit">Buy {product.name} for {product.price * quantity}</button>
      </form>
    </div>
  )
}

export default OrderPost
