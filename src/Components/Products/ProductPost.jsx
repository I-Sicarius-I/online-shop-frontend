import Navbar from "../Navigation/Navbar"
import ProductForm from "./ProductForm"

const ProductPost = () => {
  return (
    <><Navbar/>
    <div class="flex-col">
      <p class="text-2xl text-amber-200 font-bold">Create Product</p>
      <ProductForm class="m-2"/>
    </div></>
  )
}

export default ProductPost
