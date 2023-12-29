import React from "react";
import img from "../../Assets/img/pizz1.jpg";
import "./BrandDetail.scss";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const BrandDetail = () => {
  const brandDetail = [
    {
      title: "Amazon Shopping",
      id: "SKU ID - 5621335",
      description:
        "An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms. An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.",
      type: "DIGITAL",
      pricerange: "₹10 - ₹10000",
      pricedenomination: "100,200,300,400,500",
    },
  ];

  const priceDenomination = [
    {
      pd1: "₹100",
      pd2: "₹200",
      pd3: "₹300",
      pd4: "₹400",
      pd5: "₹500",
    },
  ];

  const description = [
    {
      title1: "Terms and Conditions",
      title2: "Redemption Terms",
      heading1: "1 - Redemption Information",
      heading2: "2 - In Store Information",
      TermsandConditions:
        "An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms. An AmaAn Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms. An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.zon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms. An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms. An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.",
      RedemptionInformation:
        "An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.",
      InStoreInformation:
        "An Amazon Shopping Voucher is a prepaid payment instrument that can be used to purchase physical products from Amazon. An Amazon Shopping Voucher has an expiry of 12 months from the date of activation, subject to applicable terms.",
    },
  ];

  const type = GetTranslationData("UIAdmin", "type");
  const pricerange = GetTranslationData("UIAdmin", "pricerange");
  const pricedenominations = GetTranslationData(
    "UIAdmin",
    "pricedenominations"
  );
  const termsandconditions = GetTranslationData(
    "UIAdmin",
    "termsandconditions"
  );
  const storelocator = GetTranslationData("UIAdmin", "storelocator");

  return (
    <>
      <ScrollToTop />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="card">
                <div className="card-body pt-4">
                  <div className="menu-product d-flex">
                    <img src={img} />
                    <div className="content-detail-wrap">
                      {brandDetail.map((data) => (
                        <div>
                          <div>
                            <h4 className="head-style">
                              <strong>{data.title}</strong>
                            </h4>
                            <span style={{ color: "#969ba0" }}>{data.id}</span>
                          </div>
                          <p className="mt-1 clr-blk">{data.description}</p>
                          <h5 className="mb-0">
                            <span className="fs-14 me-2">{type} - </span>
                            <strong className="text-danger txt">
                              {data.type}
                            </strong>
                          </h5>
                          <div className="d-flex justify-content-between mt-2">
                            <div className="mt-3">
                              <h6>{pricerange}</h6>
                              <h4>{data.pricerange}</h4>
                            </div>
                            <div>
                              <h6>{pricedenominations}</h6>
                              {priceDenomination.map((data) => (
                                <div className="d-flex justify-content-between">
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-secondary btn-sm mr-10"
                                  >
                                    {data.pd1}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-secondary btn-sm mr-10"
                                  >
                                    {data.pd2}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-secondary btn-sm  mr-10"
                                  >
                                    {data.pd3}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-secondary btn-sm mr-10"
                                  >
                                    {data.pd4}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-rounded btn-secondary btn-sm mr-10"
                                  >
                                    {data.pd5}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      {description.map((data) => (
                        <div>
                          <div className="tc mt-2">
                            <h6>{data.title1}</h6>
                            <p>{data.TermsandConditions}</p>
                          </div>
                          <div className=" tc mt-2">
                            <h6>{data.title2}</h6>
                            <h6>
                              <strong>{data.heading1}</strong>
                            </h6>
                            <p>{data.RedemptionInformation}</p>
                            <h6>
                              <strong>{data.heading2}</strong>
                            </h6>
                            <p>{data.InStoreInformation}</p>
                          </div>
                        </div>
                      ))}
                      <div className="only-right mt-2">
                        <a className="mr-10 on-link">{termsandconditions}</a>
                        <a className="mr-10 on-link">{storelocator}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BrandDetail;
