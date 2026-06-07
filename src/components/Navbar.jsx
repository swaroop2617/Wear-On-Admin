import React from 'react'
import { assets } from '../assets/assets'
import { NavLink,Link } from 'react-router-dom'
const Navbar = ({ setToken }) => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm flex items-center py-2 px-[4%] justify-between'>
      
      {/*  LOGO  */}
            <Link to='/' className='flex items-center'>
                <div className="h-18 sm:h-16 w-[200px] overflow-hidden flex items-center">
                    <img 
                    src={assets.logo}
                    alt="WearOn"
                    className=" object-contain scale-[2] "
                    />
                </div>
            </Link>

      <button
        onClick={() => setToken('')}
        className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition ease-in-out'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar