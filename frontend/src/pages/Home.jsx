import React from 'react'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import { Newsletterbox } from '../component/Newsletterbox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <Newsletterbox/>
    </div>
  )
}

export default Home