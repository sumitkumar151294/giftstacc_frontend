import React from 'react'
import img from '../../Images/Adidas.png'
import { Link } from 'react-router-dom';

const SectionHero = () => {
  return (
    <>
      <section class="section-hero">
        <div class="container">

          <div class="row hero justify-content-center">
            <div class="hero-img-box col-lg-6 mobile-hide">
              <img className='maxx' src={img} />
            </div>
            <div class="col-lg-6 hero-text-box"
            //  style="padding:16px;"
            >
              <h1 class="heading-primary">
                Buy and Send
                <br/>
                Gift Cards Instantly
              </h1>
              <p class="hero-description">
                Buy premium gift cards.
                <br/>
                Send by email, text, or hand deliver.
              </p>
              <Link to="/offers" class="vouch mt-2">Get Offers &nbsp;<i class="fa fa-arrow-right"></i></Link>
            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default SectionHero