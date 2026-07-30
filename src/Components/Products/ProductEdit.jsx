import { useLoaderData, useParams } from "react-router-dom"
import ProductForm from "./ProductForm"

const ProductEdit = () => {
    const {id} = useParams()
    let product = useLoaderData()
  return (
    <div class="flex-col">
      <p class="text-2xl text-amber-200 font-bold">Edit Product</p>
      <ProductForm id={id} product={product} class="m-2"/>
    </div>
  )
}

export default ProductEdit
