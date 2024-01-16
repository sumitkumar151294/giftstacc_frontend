import React from 'react'
import img1 from "../../../Assets/img/EndUser/prezzee-card-new-red.png"
import img2 from "../../../Assets/img/EndUser/airbnb-uk-approved-nov21.png"
import img3 from "../../../Assets/img/EndUser/prezzee-uk-themes-0-copy-ad2f252.png"
import img4 from "../../../Assets/img/EndUser/asos.png"
import img5 from "../../../Assets/img/EndUser/john-lewis-partners-uk-1120.jpg"


const Shop = () => {
  

  const cardData = [
    {
      id: 1,
      img: img1,
      isNew: true,
      discount: 'Upto 15% Discount',
      name: "Domino's Shopping Voucher",
      redirect:'/productcart'
    },
    {
      id: 2,
      img: img2,
      isNew: false,
      discount: 'Upto 15% Discount',
      name: "Domino's Shopping Voucher",
      redirect:''
    },
    {
      id: 3,
      img: img3,
      isNew: false,
      discount: 'Upto 15% Discount',
      name: "Domino's Shopping Voucher",
      redirect:''
    },
    {
      id: 4,
      img: img4,
      isNew: true,
      discount: 'Upto 15% Discount',
      name: "Domino's Shopping Voucher",
      redirect:''
    },
    {
      id: 5,
      img: img5,
      isNew: true,
      discount: 'Upto 15% Discount',
      name: "Domino's Shopping Voucher",
      redirect:''
    },
  ];
  
  return (
    <>
      <section className="letshop pt-4rem">
        <div className="container big-rr mb-2">
          <div className="row ">
            <div className="d-flex justify-content-between mb-4">
              <div className="first w-70">
                <span className='heading-letshop' >You Choose the gift card They choose where to spend it!</span>
                <p className="the-para-magic para mobile-hide">Just your kind of shopping – your go-to brands, your wish-list products, all with irresistible offers.</p>
              </div>
              <div className="second">
                <a className="avail2  mt-4" href="#">View All &nbsp;<i className="fa fa-arrow-right"></i></a>
              </div>
            </div>

            {cardData.map((card) => (
              <div className="col-lg-2 col-3 text-center" key={card.id}>
                <a to= {card.redirect} >
                  <div className="offer-box1">
                    <img className="w-100" src={card.img} />
                    {card.isNew && (
                      <div className="bagde-flag-wrap2">
                        <a href="#" className="bagde-flag2">
                          New
                        </a>
                      </div>
                    )}
                    <div className="coupendis mt-4">
                      <div className="fnt-12px text-dark">{card.discount}&nbsp;</div>
                      <div className="fnt-12px text-muted mb-1">{card.name}</div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop