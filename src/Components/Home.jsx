
import ProductsList from "./Products/ProductsList"
import Navbar from "./Navigation/Navbar"



const Home = () => {
    return (
    <>          
        <Navbar/>
        <div class="flex-col">
            <div class="flex-row flex-1 justify-between">
                <h1>Home</h1>
            </div>
            <ProductsList/>
        </div>
    </>
)
}

export default Home