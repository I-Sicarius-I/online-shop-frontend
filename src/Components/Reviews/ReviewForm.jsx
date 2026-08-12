import { useEffect, useState } from "react"
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

            setIsReviewing(false)
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(() => { 
        const handleRating = () => {
            if(rating < 0){
                setRating(0)
            }
            else if(rating > 5){
                setRating(5)
            }
        }
        handleRating()
    }, [rating])

  return (<>
    <div class="flex-col">
        <form onSubmit={handleSubmit}>
            <div class="flex-col bg-blue-700 border-2 border-solid">
                <input 
                    type="text"
                    placeholder="Enter product review..."
                    value={text}
                    onChange={(e) => setText(e.target.value)} 
                />
                <input 
                    type="number" 
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                />
                <button type="submit">Save</button>
                <button onClick={() => setIsReviewing(false)}>Cancel</button>
            </div>
        </form>
    </div></>
  )
}

export default ReviewForm
