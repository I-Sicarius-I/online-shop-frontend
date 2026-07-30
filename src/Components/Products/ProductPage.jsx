import { useLoaderData, useNavigate, useParams } from "react-router-dom"

const ProductPage = () => {
    const {id} = useParams()
    const product = useLoaderData()
    const nav = useNavigate()

  return (
    <div class="flex-col">
      <h1 class="font-bold text-indigo-300">{product.name}</h1>
      <p>{product.type}</p>
      <p>{product.state}</p>
      <p>{product.description}</p>
      <p>{product.quantity} left</p>
      <p>{product.price}$</p>
      <p>{product.rating} / 10</p>
      <button class="border-2 border-amber-600 m-3" onClick={() => nav(`/edit-product/${id}`)}>Edit Product</button>
    </div>
  )
}

export default ProductPage
