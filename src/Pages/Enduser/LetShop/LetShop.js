import React from 'react'



const LetShop = () => {
    const giftCardData = [
        {
            id: 1,
            // imageSrc: img1,
            name: 'Amazon',
            priceRange: '₹300 - ₹600',
            discount: '',
            rewardsEarned: '',
        },
        {
            id: 2,
            // imageSrc: img2,
            name: "Domino's",
            priceRange: '₹1050 - ₹2300',
            discount: '2.5% Off',
            rewardsEarned: '0.5% Rewards Earned',
        },
        {
            id: 3,
            // imageSrc: img3,
            name: 'Big Basket',
            priceRange: '₹990 - ₹1599',
            discount: '0.5% Off',
            rewardsEarned: '',
        },
        {
            id: 4,
            // imageSrc: img4,
            name: 'Pantaloons',
            priceRange: '₹3000 - ₹4500',
            discount: '',
            rewardsEarned: '11% Rewards Earned',
        },
        {
            id: 5,
            // imageSrc: img5,
            name: 'Flipcart',
            priceRange: '₹670 - ₹1500',
            discount: '10.5% Off',
            rewardsEarned: '11.5% Rewards Earned',
        },
        {
            id: 6,
            // imageSrc: img6,
            name: 'CafeCoffee',
            priceRange: '₹199 - ₹500',
            discount: '',
            rewardsEarned: '',
        },
        {
            id: 7,
            // imageSrc: img7,
            name: 'Bata',
            priceRange: '₹450 - ₹950',
            discount: '',
            rewardsEarned: '11.5% Rewards Earned',
        },
        {
            id: 8,
            // imageSrc: img8,
            name: 'Amazon',
            priceRange: '₹890 - ₹2000',
            discount: '8% Off',
            rewardsEarned: '',
        },
        {
            id: 9,
            // imageSrc: img9,
            name: 'Prestige',
            priceRange: '₹890 - ₹1200',
            discount: '15% Off',
            rewardsEarned: '11.5% Rewards Earned',
        },
        {
            id: 10,
            // imageSrc: img10,
            name: 'Trollbads',
            priceRange: '₹590 - ₹2600',
            discount: '5.5% Off',
            rewardsEarned: '',
        },
    ];
    return (
        <>
            <section className="letshop">
                <div className="container big-rr mb-2">
                    <div className="row text-center pt-4rem mb-4">

                        <span className="big-head text-center">Recommended Gifts for you</span>
                        <span className="big-head2 mt-2">Buy, Send & Claim Gift Cards. Chip in with Friends. Store & Manage Gift Cards.</span>
                    </div>
                    <div className="row ">
                        {giftCardData.slice(0, 5).map((card) => (
                            <div className="col-lg-2 col-6 mb-3">
                                <div className="box-coupen3">
                                    <div className="img-sec">
                                        {card.discount &&
                                            <div className="bagde-flag-wrap">
                                                <a href="#" className="bagde-flag"> {card.discount}</a>
                                            </div>
                                        }
                                        <img className="w-144" src={card.imageSrc} />
                                    </div>

                                    <div className="coupendis">
                                        <div className="fnt-12px mb-1">{card.name}</div>
                                        <div className="price-rr mb-1">{card.priceRange} </div>
                                        {card.rewardsEarned &&
                                            <div className="price-rmn">
                                                {/* <img src={img11} className="w-24px" /> */}
                                                 {card.rewardsEarned}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row mt-2 mobile-hide " style={{ display: 'flex' }} >
                        {giftCardData.slice(5, 10).map((card) => (
                            <div className="col-lg-2 col-6 mb-3">
                                <div className="box-coupen3">
                                    <div className="img-sec">
                                        {card.discount &&
                                            <div className="bagde-flag-wrap">
                                                <a href="#" className="bagde-flag"> {card.discount}</a>
                                            </div>
                                        }
                                        <img className="w-144" src={card.imageSrc} />
                                    </div>

                                    <div className="coupendis">
                                        <div className="fnt-12px mb-1">{card.name}</div>
                                        <div className="price-rr mb-1">{card.priceRange} </div>
                                        {card.rewardsEarned &&
                                            <div className="price-rmn">
                                                {/* <img src={img11} className="w-24px" /> */}
                                                 {card.rewardsEarned}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className=" text-center pt-4rem mb-4 mt-4">


                        <a href="#" className="vouch mt-4"
                        > Buy more gift cards &nbsp;<i className="fa fa-arrow-right"></i>
                        </a>

                    </div>
                </div>
            </section>
        </>
    )
}

export default LetShop