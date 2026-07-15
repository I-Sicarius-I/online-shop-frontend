import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProductForm from '../Products/ProductForm'

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
        path: "/add-product",
        element: <ProductForm />
    }
]);

export default RouterPaths;