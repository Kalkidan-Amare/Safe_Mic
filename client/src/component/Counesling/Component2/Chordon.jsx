import { Button } from '@/components/ui/button'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Chordon({isAuthenticated}) {
  return (
    <div><div className="mt-12 text-2xl font-bold text-center max-md:mt-10 max-md:max-w-full">
    “Nothing ever goes away until it has taught us what we need to know.”
  </div>
  <div className="shrink-0 mt-8 w-px border border-solid  h-[66px] mx-auto"></div>
  <div className="mt-7 text-2xl font-bold text-center">
    Chödrön
  </div>
  <div className="mt-64 text-3xl font-bold text-center max-md:mt-10 max-md:max-w-full">
    Take the first step toward a healthier you
  </div>
  <div className="flex gap-5 items-start mt-14 text-2xl font-bold max-md:flex-wrap max-md:mt-10">
    <Button className="grow justify-center px-5 py-7 text-xl font-medium border-solid rounded-[36px]  w-fit max-md:px-5 transition-all duration-300 ease-in-out">
      <NavLink to={isAuthenticated?"/oneToOneChat":"/login"}>
      Chat with a counselor

      </NavLink>
    </Button>
    <Button className="grow justify-center px-5 py-7 font-medium border text-xl border-solid rounded-[36px] w-fit max-md:px-5  transition-all duration-300 ease-in-out">
      <NavLink to={isAuthenticated?"/appointment":"/login"}>

      Book Appointment
      </NavLink>
    </Button>
    
  </div>
  
</div>

  )
}

export default Chordon