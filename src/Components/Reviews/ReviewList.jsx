import { useEffect, useState } from "react"
import axios, { BASE_URL } from "../../api/axios"
import ReviewCard from "./ReviewCard"
import useAuth from "../Authentication/AuthContext"

const ReviewList = ({productId}) => {
    const [reviews, setReviews] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const {token} = useAuth()
    const [deletedId, setDeletedId] = useState(null)

    useEffect(() => {
        const loadReviews = async() => {
            try{
                const res = await axios.get(BASE_URL + `/reviews?productId=${productId}`)

                if(res.status !== 200)
                {
                    console.error(res.data)
                }

                setIsLoaded(res.data.length > 0)
                setReviews(res.data)
            }
            catch(e){
                console.error(e)
            }
        }
        loadReviews()
    }, [reviews, productId, isLoaded])

    useEffect(() => {
        const handleDelete = async() => {
            if(deletedId !== null){
                try{
                    const res = await axios.delete(BASE_URL + `/reviews/${deletedId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    )

                    if(res.status !== 204){
                        console.error(res.data)
                    }

                    setDeletedId(null)

                }catch(e){
                    console.error(e)
                }
            }
        }
        handleDelete()
    }, [deletedId, token])


  return (<>
    {isLoaded && 
        <div class="flex-col">
            <h2>Reviews: </h2>
            {reviews.map((review) => <ReviewCard key={review.id} review={review} setDeletedId={setDeletedId}/>)}
        </div>}
    </>
  )
}

export default ReviewList
