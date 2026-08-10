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
    const [deletedId, setDeletedId] = useState(1);
    const nav = useNavigate()
    const email = useGetEmail()

    const cancelOrder = async() => {
        try{
            const res = await axios.delete(BASE_URL + "/orders/" + deletedId, {
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
        })

        if(res.status !== 204){
            console.error(res.data)
            return
        }
        }
            catch(e){
            console.error(e)
        }
    }
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
    }, [isLoggedIn, orders])

    useEffect(() => {
        const func = async() => {
            await cancelOrder()
            setDeletedId(null)
        }
        func()    
    }, [deletedId])

  return (
    <div class="flex-col">
        {orders !== null ? (
            <div class="flex-col">
                <h1>{username}'s orders:</h1>
                {orders.map((order) => (<OrderCard key={order.id} order={order} setIsDeletedId={setDeletedId}/>))}
            </div>
            ):(
            <h1>No orders</h1>
        )}
        <button onClick={() => nav("/")}>Go back to Home</button>
    </div>
  )
}

export default OrderList



