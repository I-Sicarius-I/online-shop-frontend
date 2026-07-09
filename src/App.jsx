import {RouterProvider } from 'react-router-dom'
import React from 'react'
import './App.css'
import { AuthProvider } from './Components/Authentication/AuthContext'
import RouterPaths from './Components/Navigation/RouterPaths'
import Home from './Components/Home'
import Register from './Components/User/Register'

function App() {

  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={RouterPaths}/>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App
