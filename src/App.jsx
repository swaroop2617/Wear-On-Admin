import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route,} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/dashboard/Dashboard'

export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency="₹";
const App = () => {

  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-white-50 pt-16'>
      <ToastContainer />
      { token === ""
      ? <Login setToken={setToken}/> 
      : <>
      <Navbar setToken={setToken} />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='flex-1 ml-64 p-6 text-gray-600 text-base'>
        <Routes>
          <Route path='/add' element={token ? <Add token={token} /> : <Login />} />
          <Route path='/list' element={token ? <List token={token} /> : <Login />} />
          <Route path='/orders' element={token ? <Orders token={token} /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
      </div>
      </>
      }
      
    </div>
  )
}

export default App
