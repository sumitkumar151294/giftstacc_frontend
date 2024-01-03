import React from 'react'
import image1 from '../../Images/more.png'
import image2 from '../../Images/mid2.png'
import image3 from '../../Images/more3.png'

const GiftCard = () => {
    return (
        <>
            <section class="">
                <div class="container   big-rr mb-2 pt-4rem">
                    <div class="row ">
                        <div class="col-lg-5 text-center">
                            <img class="w-320px" src={image1} />
                        </div>
                        <div class="col-lg-7">
                            <h1 class="heading-primary2">Group Gifts Made Simple</h1>
                            <p class="hero-description2" >
                                Set-up a Group Gift, invite others to chip in and choose
                                <br />
                                from hundreds of Gift Cards
                            </p>
                            <a href="#" class="vouch mt-2"
                            >Get Gift Cards &nbsp;<i class="fa fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <section class="">
                    <div class="container   big-rr mb-4 mt-4">
                        <div class="row ">
                            <img src={image2} />
                        </div>
                    </div>
                </section>

                <div class="container   big-rr mb-4 pt-4rem">
                    <div class="row ">
                        <div class="col-lg-5 text-center">
                            <img class="w-320px" src={image3} />
                        </div>
                        <div class="col-lg-7">
                            <h1 class="heading-primary2">Give the Gift of Choice</h1>
                            <p class="hero-description3">Gift them what they really want!</p>
                            <p>With the eGifter Choice Card you can give the Choice of Hundreds of Gift Cards.</p>
                            <br />
                            <a href="#" class="vouch mt-2">Know More &nbsp;<i class="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GiftCard