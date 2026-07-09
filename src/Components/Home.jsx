import { useEffect } from "react"
import ProductsList from "./Products/ProductsList"
import useAuth from "./Authentication/AuthContext"



const Home = () => {

    const {isLoggedIn, setIsLoggedIn} = useAuth()

    useEffect(() => {
        console.log("loaded")
    }, [])

    return (<>
        <a href="./register">Link to register page</a>
        <a href="./login">Link to login page</a>
        {isLoggedIn && (<p>
            Successfully logged in :D
        </p>)}
        {isLoggedIn && <button type="submit" onClick={() => {localStorage.clear(); setIsLoggedIn(false)}}>
            Log out</button>}
        <ProductsList/>
    </>)
}

export default Home