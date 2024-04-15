import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/Images/logo.png'
import { HiHome, HiMagnifyingGlass, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { TbMovie } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import HeaderItem from './HeaderItem';
import { FaRegUser } from "react-icons/fa";


function Header() {
 {/* const { user, logOut } = UserAuth();
  const [toggle, setToggle] = useState(false);
*/}
  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between bg-[#213547] '>
      <div className='flex gap-20 items-center '>
        <img className='w-[80px] md:w-[115px] object-cover rounded-full' alt="Logo" />
        <div className='hidden md:flex gap-20'>
          <Link to='/'>
            <HeaderItem name='Complaint' Icon={HiHome} />
          </Link>
          <Link to='/'>
            <HeaderItem name='Counseling' Icon={HiMagnifyingGlass} />
          </Link>
          <Link to='/'>
            <HeaderItem name='Chat' Icon={TbMovie} />
          </Link>
          
          {/*
          {user?.email ? (
            <>
            // Only render if user is signed in
           
        
              <button
                onClick={handleLogout}
                className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
              >
                Logout
              </button>
            </>
          ) : (
          <>*/}
              <Link to='/login'>
                <button className='bg-gray-600 px-6 py-2 rounded cursor-pointer text-white'>Sign In</button>
              </Link>
              <Link to='/signup'>
                <button className='bg-gray-600 px-6 py-2 rounded cursor-pointer text-white'>
                  Sign Up
                </button>
              </Link>
            {/*</>
          )}*/}
        </div>
      </div>
    </div>
  );
}

export default Header;
