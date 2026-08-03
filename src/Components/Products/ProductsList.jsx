import { useEffect, useState } from 'react'
import axios, { BASE_URL } from '../../api/axios';
import ProductCard from './ProductCard';



const ProductsList = ({email = ""}) => {
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState("")

    const getUsername = async() => {
      try{
        const res = await axios.get(BASE_URL + "/users/" + email,
          {
            headers:{
              "Content-Type": "application/json"
            }
          }
        )

        if(res.status !== 200)
        {
          return
        }

        setUsername(res.data.username)
      }catch(e){
        console.error(e)
      }
    }


    const loadProducts = async() => {
    
      const url = `${BASE_URL}/products` + (email !== "" ? `?email=${email}` : "")
      console.log(url)
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
      getUsername()
    }, [])

  return (
    <div class="flex-col">
      {products.length > 0 && <h2>{username !== "" ? `${username}'s products:`: "Products:"}</h2>}
      {products.map((product) => (<ProductCard key={product.id} product={product}/>))}
    </div>
  )
}

export default ProductsList
