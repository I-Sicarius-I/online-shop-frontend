import { useEffect, useState } from "react"
import axios, { BASE_URL } from "../../api/axios"
import useAuth from "../Authentication/AuthContext"


const OrderCard = ({order, setIsDeletedId}) => {
  const [product, setProduct] = useState({})
  const [isDeleting, setIsDeleting] = useState(false)


  useEffect(() => {
    const loadProduct = async() => {
      try{
        const res = await axios.get(BASE_URL + "/products/" + order.productId)

        if(res.status !== 200){
          console.error(res.data)
          return
        }

        setProduct(res.data)
      }
      catch(e){
        console.error(e)
      }
  }
  loadProduct()
  }, [])

  return (
    <div class="flex-col">
        <h1>Order of {order.quantity} {product.name}{order.quantity > 1 ? "s" : ""}</h1>
        <ul>
          <li>{order.dateOrdered} ordered</li>
          <li>{order.dateShipped} shipped</li>
          <li>{order.dateReceived} delivered</li>
        </ul>
        {!isDeleting && <button onClick={() => setIsDeleting(true)}>Cancel Order</button>}
        {isDeleting && 
          <div>
            <h3>Are you sure you want to cancel your order?</h3>
            <div class="flex-row justify-between">
              <button class="m-2" onClick={() => setIsDeletedId(order.id)}>Delete</button>
              <button class="m-2" onClick={() => setIsDeleting(false)}>Cancel</button>
            </div>
          </div>
        }
    </div>
  )
}

export default OrderCard
