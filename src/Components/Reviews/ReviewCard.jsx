import { useEffect, useState } from "react"
import axios, { BASE_URL } from "../../api/axios"

const ReviewCard = ({review}) => {
    const [username, setUsername] = useState("")


    useEffect(() => {
        const loadUser = async() => {
            try{
                const res = await axios.get(BASE_URL + "/users/" + review.reviewerId,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )

                if(res.status !== 200){
                    console.error(res.data)
                }

                setUsername(res.data.username)
            }
            catch(e){
                console.error(e)
            }
        }

        loadUser()
    }, [review])


  return (
    <div class="flex-col">
      <h2>{username}</h2>
      <p>{review.text}</p>
      <p>{review.rating} / 5</p>
    </div>
  )
}

export default ReviewCard
