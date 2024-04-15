import React from 'react'
import Aptime from './Aptime'
function Apoo() {
  return (
    <div className="flex flex-col">
    <div className="flex flex-col items-start pl-12 mt-1.5 w-full">
      <div className="mt-28 ml-20 text-4xl font-semibold max-md:mt-10 max-md:ml-2.5">
      Your Appointments
      </div>
      <div className="flex flex-col justify-center mt-5 ml-16 md:w-3/4 text-xs leading-4 max-md:ml-2.5">
        <div className="">
          <Aptime/>

      </div>
      </div>
    </div>
  </div>
  )
}

export default Apoo