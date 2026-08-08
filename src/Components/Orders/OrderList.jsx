import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import OrderCard from "./OrderCard"
import axios, { BASE_URL } from "../../api/axios"
import { useGetEmail } from "../../Hooks/userHooks"
import useAuth from "../Authentication/AuthContext"


const OrderList = () => {
    const {username} = useParams()
    const {isLoggedIn, token} = useAuth()
    const [orders, setOrders] = useState(null)
    const nav = useNavigate()
    const email = useGetEmail()

    const loadOrders = async() => {
        try{
            const res = await axios.get(BASE_URL + `/orders?email=${email}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
            )

            if(res.status !== 200){
                console.error(res.data)
            }

            setOrders(res.data)
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        const func = async() => {
            if(isLoggedIn){
                await loadOrders()
        }
        }
        func()
    }, [isLoggedIn])

  return (
    <div class="flex-col">
        {orders !== null ? (
            <div class="flex-col">
                <h1>{username}'s orders:</h1>
                {orders.map((order) => (<OrderCard key={order.id} order={order}/>))}
            </div>
            ):(
            <h1>No orders</h1>
        )}
        <button onClick={() => nav("/")}>Go back to Home</button>
    </div>
  )
}

export default OrderList



