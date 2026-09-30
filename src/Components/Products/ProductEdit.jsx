import { useLoaderData, useParams } from "react-router-dom"
import ProductForm from "./ProductForm"
import { useEffect, useState } from "react"
import { useGetEmail } from "../../Hooks/userHooks"
import useAuth from "../Authentication/AuthContext"
import Navbar from "../Navigation/Navbar"

const ProductEdit = () => {
    const {id} = useParams()
    let product = useLoaderData()
    const [isSeller, setIsSeller] = useState(false)
    const email = useGetEmail();
    const {isLoggedIn} = useAuth()

    useEffect(() => {
      const loadEmail = () => {
        

        if(email !== ""){
          setIsSeller(email === product.sellerId)
        }

      }
      loadEmail();
    }, [isLoggedIn])

  return (
    <><Navbar/>
    <div class="flex-col">
      <p class="text-2xl text-amber-200 font-bold">Edit Product</p>
      {isSeller ? <ProductForm id={id} product={product} class="m-2"/> : 
      <p>ERROR: Invalid user to edit</p>}
    </div></>
  )
}

export default ProductEdit
