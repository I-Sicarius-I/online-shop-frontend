import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import useAuth from "../Authentication/AuthContext"
import { useGetEmail } from "../../Hooks/userHooks"
import axios, { BASE_URL } from "../../api/axios"

const ProductPage = () => {
    const {id} = useParams()
    const product = useLoaderData()
    const nav = useNavigate()

    const {isLoggedIn, token} = useAuth()
    const [isSeller, setIsSeller] = useState(false)

    useEffect(() => {
      const email = useGetEmail()

      if(email !== ""){
        setIsSeller(email === product.sellerId)
      }

    }, [isLoggedIn])

    const handleDelete = async() => {

      try{
        const res = await axios.delete(BASE_URL + "/products/" + product.id,
          {
            headers: {
              "Content-Type" : "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        )

        if(res.status !== 204){
          console.error(res.data)
        }

        nav("/")
      }
      catch(error)
      {
        console.error(error)
      }
    }

  return (
    <div class="flex-col">
      <h1 class="font-bold text-indigo-300">{product.name}</h1>
      <p>{product.type}</p>
      <p>{product.state}</p>
      <p>{product.description}</p>
      <p>{product.quantity} left</p>
      <p>{product.price}$</p>
      <p>{product.rating} / 10</p>
      <p>Owner: {product.sellerId}</p>
      <div class="flex-row justify-between">
        {isSeller && <button class="border-2 border-amber-600 m-3" onClick={() => nav(`/edit-product/${id}`)}>Edit Product</button>}
        {isSeller && <button class="border-2 border-amber-600 m-3" type="submit" onClick={() => handleDelete()}>Delete product</button>}
      </div>
    </div>
  )
}

export default ProductPage
