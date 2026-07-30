import { useNavigate } from "react-router-dom"


const ProductCard = ({product: {id, name,  quantity, price, rating}}) => {
  const nav = useNavigate()

  return (
    <div class="border-solid border-2 border-black flex-col m-2">
      <div>
        <h3 class="text-2xl font-bold">{name}</h3>
        <div>
            <ul>
                <li>{quantity} left</li>
                <li>{price}$</li>
                <li>{rating} / 10</li>
            </ul>
        </div>
      </div>
      <button class="border-amber-50 border-1" onClick={() => nav(`/product/${id}`)}>View Product</button>
    </div>
  )
}

export default ProductCard
