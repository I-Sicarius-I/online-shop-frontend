import { useEffect, useState } from 'react'
import axios, { BASE_URL } from '../../api/axios';
import ProductCard from './ProductCard';



const ProductsList = ({email = ""}) => {
    const [products, setProducts] = useState([]);

    const loadProducts = async() => {
      const url = `${BASE_URL}/products` + (email !== "" ? `?email=${email}` : "")

      try
      {
        let res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if(res.status !== 200){
          console.error(res)
          return
        }

        setProducts(res.data)
      }
      catch(error){
        console.error(error)
      }
    }
    useEffect(() => {
      loadProducts()
    }, [])

  return (
    <div class="flex-col">
      {products.map((product) => (<ProductCard key={product.id} product={product}/>))}
    </div>
  )
}

export default ProductsList
