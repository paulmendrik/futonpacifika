import React, { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import Pages from '../utils/pages';



export const Navigation = () => {

const [ isOpen, setOpen ] = useState(false);

const menu = {
initial: { y: '-2000px', height: 0, opacity: 0, transition: { duration: 2, type: 'tween'}},
open: { y: 0, height: '100vh', width: '100vw',  opacity: 0.9, transition: { duration: 2, type: 'tween'}},
closed: { y: '-2000px', height: 0, opacity: 0, transition: { duration: 2, type: 'tween'}}
}
   
const container = {
hidden: { opacity: 0 },
show: { opacity: 1, transition: { staggerChildren: 1, delay: 0.5,  duration: 1,  ease: 'easeInOut' } },
exit: { opacity: 0 },
}

return (
<Fragment>
<div className='flex justify-end relative -mt-1.5 lg:-mt-0 z-50'>
<Hamburger   toggled={isOpen} toggle={setOpen} color={isOpen ? '#ffffff' : `#c10007`} size={24} /> 
</div>
<AnimatePresence>
{isOpen && ( 
<motion.div 
className=' absolute top-0 left-0   w-screen h-screen bg-orange-800 '
variants={menu}
initial={"initial"}
animate={"open"}
exit={"closed"}
>
<motion.div
className='flex flex-col justify-center items-center w-full h-full' 
variants={container} 
initial='hidden' 
whileInView={"show"} 
>
{Pages.map((page:any, i:any) => (
<motion.div 
key={page.key}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1, delay: i * 0.75 , ease: 'linear'}}
>
<div>
<a href={page.url} className='text-white lg:text-4xl text-2xl font-karma font-thin lg:leading-relaxed leading-tight '>{page.name}</a>
</div>
</motion.div>
))}
</motion.div>
</motion.div>
)}
</AnimatePresence>
</Fragment>
)}