import React from 'react'
import MainHeader from '../../../Components/EndUser/MainHeader/MainHeader'
import MainSubHeader from '../../../Components/EndUser/MainSubHeader/MainSubHeader'
import SectionHero from '../../../Pages/Enduser/SectionHero/SectionHero'
import Shop from '../Shop/Shop'
import MainFooter from '../../../Components/EndUser/MainFooter/MainFooter'


const MainHomePage = () => {
  return (
    <div>
      <MainHeader />
      <MainSubHeader />
      <SectionHero />
      <Shop />
      <MainFooter/>
    </div>
  )
}

export default MainHomePage
