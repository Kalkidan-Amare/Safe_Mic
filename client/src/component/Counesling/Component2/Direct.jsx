import { Button } from '@/components/ui/button'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
function Direct({isAuthenticated}) {
  return (
    <div className="mt-16 mx-8">
          <motion.div className="self-stretch text-8xl font-bold max-sm:mr-1.5 max-sm:max-w-full max-sm:text-4xl"
          initial={{
            y:100,
            opacity:0
          }}
          animate={{
            y:0,
            opacity:1
          }}
          transition={{
            duration:1,
            ease:'easeOut',
            delay:0.3
          }}
          >
      <span id='section1' className='flex flex-col h-[60vh]  items-center'>
          Get Online Counseling Service
        <Button className="self-start my-12 rounded-3xl p-6 text-lg font-semibold">
        <NavLink to={isAuthenticated?"/chooseCounselor":"\login"}>
          Chat with a counselor
        </NavLink>
        </Button>
      </span>
        </motion.div>
        <motion.div id='section3' className="text-lg max-md:mt-10 max-md:max-w-full"
        initial={{
          opacity:0,
          y:100
        }}
        whileInView={
          {
            opacity:1,
            y:0
          }}
        transition={{duration:1,
          delay:0.3, ease:'easeOut'}}
        >
          <div className="self-stretch text-2xl font-bold max-md:mt-40 max-md:mr-1.5 max-md:max-w-full mt-48">
            What is Online Counseling?
          </div>
          <div>
              Online counseling, also known as e-counseling, 
              cyber-counseling, or teletherapy, 
              refers to the provision of professional counseling services 
              via the internet. It involves therapists or counselors 
              delivering mental health support and guidance to clients remotely, 
              typically through video calls, phone calls, messaging, or email.

          </div>
        <Button className="self-start my-8 p-6 rounded-3xl ">
          <NavLink to={isAuthenticated?'/appointment':'/login'}>
            
          Book Appointment
          </NavLink>
        </Button>
        </motion.div>
        
      </div>
  )
}

export default Direct