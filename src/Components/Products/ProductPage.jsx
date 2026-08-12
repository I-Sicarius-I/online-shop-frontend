import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import useAuth from "../Authentication/AuthContext"
import { useGetEmail } from "../../Hooks/userHooks"
import axios, { BASE_URL } from "../../api/axios"
import ReviewList from "../Reviews/ReviewList"
import ReviewForm from "../Reviews/ReviewForm"

const ProductPage = () => {
    const {id} = useParams()
    const email = useGetEmail()
    const product = useLoaderData()
    const nav = useNavigate()

    const {isLoggedIn, token} = useAuth()
    const [isSeller, setIsSeller] = useState(false)
    const [isBuyer, setIsBuyer] = useState(false)
    const [isReviewing, setIsReviewing] = useState(false)

    useEffect(() => {
      const func = () => {
      if(email !== ""){
        setIsSeller(email === product.sellerId)
      }}
      func()
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

    useEffect(() => {
      const checkBuyer = async() => {
        try{
          const res = await axios.get(BASE_URL + `/orders?email=${email}&productId=${product.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          )
          console.log(res)
          if(res.status !== 200){
            console.error(res.data)
          }

          setIsBuyer(res.data)
        }
        catch(e){
          console.error(e)
        }
      }
      checkBuyer()
    }, [product, email, token])

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
        {!isSeller && <button class="border-2 border-amber-600 m-3" onClick={() => nav(`/buy-product/${id}`)}>Buy product</button>}
      </div>
      {isBuyer && !isReviewing && <button class="border-2 border-amber-600 m-3" onClick={() => setIsReviewing(true)}>Review product</button>}
      {isReviewing && 
        <div class="flex-col">
            <ReviewForm productId={product.id} setIsReviewing={setIsReviewing}/>
        </div>
      }
      <ReviewList productId={id}/>
    </div>
  )
}

export default ProductPage
