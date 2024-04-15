import React from 'react'
import { motion } from 'framer-motion'
function Hero() {
  return (
    <div className='my-24'>
    <p className="mt-32 text-3xl font-medium text-center  max-md:mt-10">
    " Building Bridges To Well-Being And Support "
    </p>
    <motion.div className="justify-center px-14 py-5 mt-11 text-2xl font-semibold text-center text-foreground whitespace-nowrap rounded-[14px] max-md:px-5 max-md:mt-10"
    initial={{
      x:-100,
      opacity:0
    }}
    animate={{
      x:0,
      opacity:1
    }}
    transition={{
      duration:0.7,
      ease:'easeOut',
    }}
    >
      Welcome to Safe Mic 
    </motion.div>
    </div>
  )
}

export default Hero