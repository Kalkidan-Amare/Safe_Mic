import React from 'react'
import { Card,CardContent,CardDescription,CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import couselingpic from '/Images/counselor-6741671_640.jpg'
import { motion } from 'framer-motion'
function Benefit() {
  return (
          <div className='flex items-center px-12 mt-48'>
              
              <img
                src={couselingpic}
                loading="lazy"
                className="hidden md:inline max-w-sm rounded-l-[50px] basis-1/3 "
              />
            <Card className={cn('leading-8 p-8 m-4 md:basis-2/3 w-full ')}>
            <CardTitle>What are the benefits?</CardTitle>
            <CardDescription className=' font-light'>
                  Online counseling offers several benefits, including:

            </CardDescription>
            <motion.ol type='1' className='list-decimal'
            initial={{
              opacity:0.3,
            }}
            whileInView={
              {
            opacity:1,
              }}
            transition={{duration:1,
            delay:0.3}}
            >
            <li>
            <b className='font-semibold '>Accessibility:
              </b>Access counseling from anywhere, overcoming distance.
            </li>

            <li>
              <b className='font-semibold '>
                Convenience:
              </b>
              Schedule sessions at your convenience, saving time and travel.
            </li>
            <li>
              <b className='font-semibold '>
                Anonymity and Privacy:
              </b>
              Discuss sensitive issues online, with added privacy.
            </li>
            <li>
            <b className='font-semibold '>
              Cost-Effectiveness:
            </b>
            Save on travel expenses, potentially lower fees.
            </li>
            <li>
              <b className='font-semibold '>
                Flexibility:
              </b>
              Choose communication formats to suit your needs.
            </li>
            </motion.ol>
            </Card>
</div>
  )
}

export default Benefit