import React from 'react'
import RevealTopText from '../components/cool/RevealTopText'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className='h-screen w-full bg-blue-950 flex justify-center'>
      <Navbar />
      <div className='pt-20'><h2 className='text-white'><RevealTopText /></h2></div>
    </div>
  )
}

export default Home