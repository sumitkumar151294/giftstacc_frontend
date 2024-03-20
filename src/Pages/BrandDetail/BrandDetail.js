import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Button from "../../Components/Button/Button";
import { useLocation } from "react-router-dom";

const BrandDetail = () => {
  const location = useLocation();
  const data = location.state;
  const type = GetTranslationData("UIAdmin", "type");
  const pricerange = GetTranslationData("UIAdmin", "pricerange");
  const pricedenominations = GetTranslationData(
    "UIAdmin",
    "pricedenominations"
  );
  const sku = GetTranslationData("UIAdmin", "sku");
  const termsandconditions = GetTranslationData(
    "UIAdmin",
    "termsandconditions"
  );
  const storelocator = GetTranslationData("UIAdmin", "storelocator");
  const formattedContent = data?.tncContent.replace(/<br\s*\/?>/gi, "\n");
  const paragraphs = formattedContent?.split("\n");
  return (
    <>
      <ScrollToTop />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="menu-product d-flex">
                    <img src={data?.mobile} />
                    <div className="content-detail-wrap">
                      <div>
                        <div>
                          <h4 className="head-style">
                            <strong>{data?.name}</strong>
                          </h4>
                          <span className="fs-14 me-2">{sku} ID -</span>
                          <span style={{ color: "#969ba0" }}>{data?.sku}</span>
                        </div>
                        <p className="mt-1 clr-blk">{data?.description}</p>
                        <h5 className="mb-0">
                          <span className="fs-14 me-2">{type} - </span>
                          <strong className="text-danger txt">
                            {data?.type}
                          </strong>
                        </h5>
                        <div className="d-flex justify-content-between mt-2">
                          <div className="mt-3">
                            <h6>{pricerange}</h6>
                            <h4>{data?.price}</h4>
                          </div>
                          <div>
                            <h6>{pricedenominations}</h6>
                            <div className="d-flex justify-content-between">
                              <Button
                                type="button"
                                className="btn btn-rounded btn-secondary btn-sm mr-10"
                                text={data?.priceDenominations}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {data?.tncContent !== "" && (
                          <div className="tc mt-2">
                            <h6>{termsandconditions}</h6>
                            {paragraphs?.map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                          </div>
                        )}
                        {/* <div className=" tc mt-2">
                          <h6>{data.title2}</h6>
                          <h6>
                            <strong>{data.heading1}</strong>
                          </h6>
                          <p>{data.RedemptionInformation}</p>
                          <h6>
                            <strong>{data.heading2}</strong>
                          </h6>
                          <p>{data.InStoreInformation}</p>
                        </div>  */}
                      </div>
                      <div className="only-right mt-2">
                        <a className="mr-10 on-link" href={""}>
                          {termsandconditions}
                        </a>
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
