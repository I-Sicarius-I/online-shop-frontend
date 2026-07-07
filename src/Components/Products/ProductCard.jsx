import React from 'react'

const ProductCard = ({product: {id, name, type, state, quantity, description, price, rating}}) => {
  return (
    <div class="border-solid border-2 border-black">
      <div>
        <h3>Test</h3>
        <h3>{name}</h3>
        <div>
            <ul>
                <li>{id}</li>
                <li><p>{type}</p></li>
                <li>{state}</li>
                <li>{quantity}</li>
                <li>{description}</li>
                <li>{price}</li>
                <li>{rating}</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
