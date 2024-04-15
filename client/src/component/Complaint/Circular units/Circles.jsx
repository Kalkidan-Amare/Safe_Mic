import {motion} from 'framer-motion'
function Circles({title, detail}){
    return <motion.div 
    className="flex flex-wrap
    aspect-square max-w-md rounded-full p-2 m-8 items-center 
    justify-center shadow-md bg-secondary-foreground text-background" 
    whileInView={{
        opacity:1,
        y:0
    }}
    transition={{
        duration:1
    }}
    initial={{
        opacity:0,
        y:100
    }}
    >

        <span className="text-center text-sm ">
            <h1 className="  text-xl">
                {title}
            </h1>
            <br />
            <motion.p className='text-xs'
            initial={{
                y:20,
                opacity:0
            }}
            whileInView={{
                y:0,
                opacity:[0.1,0.3,0.5,1]
            }}
            transition={{
                duration:1
            }}
            >
            {detail}
            </motion.p>
        </span>
    
    </motion.div>
}export default Circles;