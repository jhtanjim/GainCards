import React from 'react'
import Pokaemon from '../../Shared/Pokaemon/Pokaemon'
import Banner from '../Banner/Banner'
import Banner1 from '../Banner/Banner1'
import About from '../About/About'

const Home = () => {
  return (
    <div className=''>
      <Banner className="bg-black" />
      <Banner1/>
      <About/>
      <Pokaemon/>
    </div>
  )
}

export default Home
