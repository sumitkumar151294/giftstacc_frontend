import React from 'react'
import MainHeader from '../../../Components/EndUser/MainHeader/MainHeader'
import MainSubHeader from '../../../Components/EndUser/MainSubHeader/MainSubHeader'
import SectionHero from '../../../Pages/Enduser/SectionHero/SectionHero'
import Shop from '../Shop/Shop'
import Footer from '../Footer/Footer'


const MainHomePage = () => {
  return (
    <div>
      <MainHeader />
      <MainSubHeader />
      <SectionHero />
      <Shop />
      <Footer />
    </div>
  )
}

export default MainHomePage
