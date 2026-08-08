import { useEffect, useState } from "react"
import axios, { BASE_URL } from "../../api/axios"


const OrderCard = ({order}) => {
  const [product, setProduct] = useState({})



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
    </div>
  )
}

export default OrderCard
