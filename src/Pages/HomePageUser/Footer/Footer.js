import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setActiveTab } from "../../redux/modules/User/activeTabSlice";
function Footer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMyAccount = () => {
        dispatch(setActiveTab(''));
        navigate("/myprofile");
    };
    const handleOrder = () => {
        dispatch(setActiveTab('order'));
        navigate("/myprofile");
      };
    return (
        <footer class="footer1">
            <section class="contact-area pb-3" id="contact">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 offset-lg-3">
                            <div class="contact-content text-center">

                                <p>LC Reward- Customer Capital Capital Gifts are prepaid Cards of brands with a certain value. You can buy products or services from that brand to redeem the existing value of the Cards. </p>
                                <div class="hr">
                                    <h6>hello@contact.com</h6>
                                    <h6>+9-19870223180</h6>
                                </div>
                                <div class="contact-social">
                                    <ul>
                                        <li><a class="hover-target" href=""><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a class="hover-target" href=""><i class="fab fa-linkedin-in"></i></a></li>
                                        <li><a class="hover-target" href=""><i class="fab fa-instagram"></i></a></li>
                                        <li><a class="hover-target" href=""><i class="fab fa-youtube"></i></a></li>
                                        <li><a class="hover-target" href=""><i class="fab fa-twitter"></i></a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container-xl mt-2">
                <div class="row gx-0">
                    <div class="col-12 col-md-8 pb-3 mb-3 border-bottom">
                        <ul class="list-inline m-0 text-center text-md-start">
                            <li class="list-inline-item"><Link to='/contactus' class="clr-white">Contact us</Link></li>
                            <li class="list-inline-item" ><Link to='/aboutus' class="clr-white">About us</Link></li>
                            <li class="list-inline-item"><Link to='/faqs' class="clr-white">FAQs</Link></li>
                            <li class="list-inline-item"><Link to='/blog' class="clr-white">Blog</Link></li>
                            <li class="list-inline-item"><a onClick={handleMyAccount} class="clr-white">My Profile</a></li>
                            <li class="list-inline-item"><a onClick={handleOrder} class="clr-white">My Orders</a></li>
                        </ul>
                    </div>
                    <div class="col-5 col-md-4 pb-3 mb-3 border-bottom">
                        <ul class="list-inline mb-0 text-start text-md-end">
                            <li class="list-inline-item d-none d-md-inline-block clr-white">Social Media:</li>

                            <li class="list-inline-item">
                                <a target="_blank" rel="noreferrer" aria-label="instagram-logo" href="#"><i class="fab fa-instagram clr-white"></i></a>
                            </li>

                            <li class="list-inline-item">
                                <a target="_blank" rel="noreferrer" aria-label="facebook-logo" href="#"><i class="lab la-facebook-f clr-white"></i></a>
                            </li>


                            <li class="list-inline-item">
                                <a target="_blank" rel="noreferrer" aria-label="twitter-logo" href="#"><i class="lab la-twitter clr-white" ></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a target="_blank" rel="noreferrer" aria-label="yt-logo" href="#"><i class="lab la-youtube clr-white"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-12 order-mobile-last text-center">
                        <ul class="list-inline m-0 fs-12 text-center text-md-start">
                            <li class="list-inline-item"><Link to='/privacypolicy' class="clr-white">Privacy Policy</Link></li>
                            <li class="list-inline-item"><Link to='/termsofuse' class="clr-white">Terms of Use</Link></li>
                            <li class="list-inline-item"><Link to='/loyaltyprogram' class="clr-white">LC Loyalty-Program</Link></li>
                            <li class="list-inline-item"><Link href="#" class="clr-white">Site Map</Link></li>
                        </ul>
                    </div>

                </div>
            </div>


        </footer>
    );
}

export default Footer;