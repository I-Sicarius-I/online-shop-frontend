import { useState } from "react"
import axios, { BASE_URL } from "../../api/axios"
import { useGetEmail } from "../../Hooks/userHooks"
import useAuth from "../Authentication/AuthContext"

const ReviewForm = ({productId, setIsReviewing}) => {
    const [text, setText] = useState("")
    const [rating, setRating] = useState(0.)
    const email = useGetEmail()
    const {token} = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const res = axios.post(BASE_URL + "/reviews", 
            {
                text: text,
                rating: rating,
                productId: productId,
                reviewerId: email
            },
            {   
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if(res.status !== 201){
                console.error(res.data)
            }
        }
        catch(e){
            console.error(e)
        }
    }

  return (
    <div class="flex-col">
        <form onSubmit={handleSubmit} class="flex-col">
            <input 
                type="text"
                placeholder="Enter product review..."
                value={text}
                onChange={(e) => setText(e.target.value)} 
            />
            <label for="rating">Rating (0 to 5)</label>
            <input 
                type="range" 
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
            />
            <button type="submit">Save</button>
            <button onClick={() => setIsReviewing(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default ReviewForm
