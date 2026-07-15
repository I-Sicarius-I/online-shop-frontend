import { useEffect, useState } from 'react'
import axios, { BASE_URL } from '../../api/axios';
import ProductCard from './ProductCard';



const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/products`).then((response) => {
            setProducts(response.data)
            console.log("products")
        })
    }, [])

  return (
    <div class="flex-col">
        <h1>Test</h1>
      {products.map((product) => (<ProductCard key={product.id} product={product}/>))}
    </div>
  )
}

export default ProductsList
