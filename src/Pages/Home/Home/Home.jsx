import React from 'react'
import Pokaemon from '../../Shared/Pokaemon/Pokaemon'
import Banner from '../Banner/Banner'
import Banner1 from '../Banner/Banner1'
import About from '../About/About'
import PokemonCardsCollection from '../PokemonCardsCollection/PokemonCardsCollection'
import Subscription from '../Subscription/Subscription'
import DonateSection from '../DonateSection/DonateSection'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'

const Home = () => {
  return (
<div className="min-h-screen">  
      <Banner className="bg-black" />
      {/* <Banner1/> */}
      <PokemonCardsCollection/>
      <Subscription/>
      <About/>
      <DonateSection/>
      <WhyChooseUs/>
      {/* <Pokaemon/> */}
    </div>
  )
}

export default Home
