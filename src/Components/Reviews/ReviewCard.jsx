import { useEffect, useState } from "react"
import axios, { BASE_URL } from "../../api/axios"
import { useGetEmail } from "../../Hooks/userHooks"

const ReviewCard = ({review, setDeletedId}) => {
    const [username, setUsername] = useState("")
    const email = useGetEmail()

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
      <h2>{review.text}</h2>
      <p>{review.rating} / 5</p>
      <h3>By {username}</h3>
      {review.reviewerId === email && <button onClick={()=> setDeletedId(review.id)}>Delete review</button>}
    </div>
  )
}

export default ReviewCard
