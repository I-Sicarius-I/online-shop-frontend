import {RouterProvider } from 'react-router-dom'
import React from 'react'
import './App.css'
import { AuthProvider } from './Components/Authentication/AuthContext'
import RouterPaths from './Components/Navigation/RouterPaths'
import Navbar from './Components/Navigation/Navbar'

function App() {

  return (
    <React.StrictMode>
      <AuthProvider>          
        <RouterProvider router={RouterPaths}>
          <Navbar/>
        </RouterProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App
