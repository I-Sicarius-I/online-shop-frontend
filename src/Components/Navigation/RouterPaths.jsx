import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProductEdit from '../Products/ProductEdit'
import ProductPost from '../Products/ProductPost'
import axios, { BASE_URL } from "../../api/axios"
import ProductPage from '../Products/ProductPage'
import ProfilePage from '../User/ProfilePage'
import DeleteProfile from '../User/DeleteProfile'

const Home = React.lazy(() => import("../Home"))
const Login = React.lazy(() => import("../User/Login"))
const Register = React.lazy(() => import("../User/Register"))

const RouterPaths = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/user/:username",
        loader: async({params}) => {
            try{
                let user = await axios.get(BASE_URL + "/users?username=" + params.username,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                console.log(user.data)
                return user
            }
            catch(error)
            {
                console.error(error)
                return error
            }
        },
        element: <ProfilePage/>
    },
    {
        path: "/user/:username/delete",
        element: <DeleteProfile/>
    },
    {
        path: "/add-product",
        element: <ProductPost />
    },
    {
        path: "/edit-product/:id",
        loader: async({params}) => {
            try{
                let product = await axios.get(BASE_URL + "/products/" + params.id,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }    
                )

                return product.data
            }catch(error){
                console.error(error)
                return error.data
            }
        },
        element: <ProductEdit/>
    },
    {
        path: "/product/:id",
        loader: async({params}) => {
            let product = await axios.get(BASE_URL + "/products/" + params.id,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }    
            )
            console.log(product)

            return product.data
        },
        element: <ProductPage/>
    }
]);

export default RouterPaths;