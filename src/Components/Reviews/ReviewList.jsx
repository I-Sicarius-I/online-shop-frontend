import { useEffect, useState } from "react"
import axios, { BASE_URL } from "../../api/axios"
import ReviewCard from "./ReviewCard"

const ReviewList = ({productId}) => {
    const [reviews, setReviews] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadReviews = async() => {
            try{
                const res = await axios.get(BASE_URL + `/reviews?productId=${productId}`)

                if(res.status !== 200)
                {
                    console.error(res.data)
                }

                setIsLoaded(true)
                setReviews(res.data)
            }
            catch(e){
                console.error(e)
            }
        }
        loadReviews()
    }, [reviews, productId, isLoaded])


  return (<>
    {isLoaded && 
        <div class="flex-col">
            <h2>Reviews: </h2>
            {reviews.map((review) => <ReviewCard key={review.id} review={review}/>)}
        </div>}
    </>
  )
}

export default ReviewList
