import React from "react";
import "../../assets/css/footer.css";
import IconPinterest from "../../assets/icon/pinterest.svg";
import IconFacebook from "../../assets/icon/facebook.svg";
import IconTwitter from "../../assets/icon/twitter.svg";

const Footer = ({ Categories }) => {
  return (
    <div className="section-footer">
      <div className="parent-footer pt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="define-footer col-md-3">
            <div>
              <h3 className="text-logo-blog">My Blog</h3>
              <p className="text-logo-text">
                is have article collection about several topic which is from
                experience and also persepective
              </p>
            </div>
          </div>
          <div className="col-md-3"></div>
          <div className="right-footer col-md-3  ">
            <div className="parent-social-media ">
              <p className="text-social-media">SOCIAL MEDIA</p>

              <div>
                <a className="navigation-logo-footer" href="#">
                  <img src={IconPinterest} />
                </a>

                <a className="navigation-logo-footer" href="#">
                  <img src={IconFacebook} />
                </a>

                <a className="navigation-logo-footer" href="#">
                  <img src={IconTwitter} />
                </a>
              </div>
            </div>
            <div className="parent-categories">
              <p className="text-categories">CATEGORIES</p>

              <div className="parent-link-categories">
                {(Categories || []).map((item, index) => {
                  return (
                    <div key={index}>
                      {index < 4 && (
                        <a className="list-link-categories" href="#">
                          <p>{item.category_name}</p>
                        </a>
                      )}
                    </div>
                  );
                })}

                <a className="list-link-categories" href="#">
                  <p>Other</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-footer mt-4">
          <p className="text-bottom-footer">Made by Rizky Syahroni</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
