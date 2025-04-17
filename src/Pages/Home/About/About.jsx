import React from 'react'
import backgroundImage from "../../../assets/aboutBg/aboutBg.png"
import "../../../../src/index.css"
const About = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image with reduced opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Content on top */}
      <div className="relative z-10"> 
        <div className="h-screen text-9xl text-white"><h1 className=''>hellp</h1></div>
        <div className="h-screen text-9xl text-white">1</div>
        <div className="h-screen text-9xl text-white">1</div>
      </div>
    </div>
  )
}

export default About
