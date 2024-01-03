import React from 'react'
import Footer from './Footer/Footer'
import GiftCard from './GiftCard/GiftCard'
import Header from './Header/Header'
import LetShop from './LetShop/LetShop'
import Login from './Login/Login'
import NewHeader from './NewHeader/NewHeader'
import SectionHero from './SectionHero/SectionHero'
import Shop from './Shop/Shop'

const HomePageUser = () => {
  return (
    <>
      <Header />
      <NewHeader />
      <SectionHero />
      <Shop />
      <LetShop />
      <GiftCard />
      <Footer />
      <Login />
    </>
  )
}

export default HomePageUser