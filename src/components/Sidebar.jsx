import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l 
     ${isActive ? 'bg-orange-100 border-orange-100 text-orange-600' : ''}`

  return (
    <div className='w-64 min-h-screen fixed border-r bg-white'>
      <div className='flex flex-col gap-4 pt-6 pl-4'>

        <NavLink to='/dashboard' className={navStyle}>
          <img className='w-5 h-5' src={assets.dashboard_icon} alt="" />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        <NavLink to='/add' className={navStyle}>
          <img className='w-5 h-5' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink to='/list' className={navStyle}>
          <img className='w-5 h-5' src={assets.list} alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink to='/orders' className={navStyle}>
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Orders Items</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar