import React from 'react'
import { images } from '../assets/image'
const Home = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <img src={images.home} className='h-1/2'></img>
      <p className='text-slate-600 font-bold'>welcome to </p>
      <p  className='text-5xl font-black text-black'> Employee Management Website</p>
     
    </div>
  )
}

export default Home
