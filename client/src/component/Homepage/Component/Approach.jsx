import React from 'react'
import { Card,CardTitle,CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
function Approach() {
  return (
  <Card className="px-2 py-8 shadow-none border-none my-24">
    <CardTitle className='text-center my-8'>
      Our Approach
    </CardTitle>
    <CardContent className='text-lg'>
<motion.p 
className=' font-sans text-center'
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
delay:0.3, ease: 'easeOut'}}
> 

    we are dedicated to empowering you by enhancing your mental
    strength and physical well-being. Our whole-person approach encompasses
    a range of transformative methods, including comprehensive testing,
    brain mapping, and holistic counseling. Throughout your journey towards
    optimal health, we stand by your side, offering unwavering support and
    guidance at every moment, working together to improve and enrich your
    life.
</motion.p>
    </CardContent>
  </Card>
  
  )
}

export default Approach