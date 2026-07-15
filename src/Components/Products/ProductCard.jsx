

const ProductCard = ({product: {name,  quantity, price, rating}}) => {
  return (
    <div class="border-solid border-2 border-black flex-col">
      <div>
        <h3>Test</h3>
        <h3>{name}</h3>
        <div>
            <ul>
                <li>{quantity}</li>
                <li>{price}</li>
                <li>{rating}</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
