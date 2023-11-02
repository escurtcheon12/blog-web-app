import React, {useEffect } from "react";
import "../../assets/css/contact.css";

const Contact = ({Navbar, Footer}) => {
  useEffect(() => {
    localStorage.removeItem("dataBlog");
    localStorage.clear();
  }, []);

  return (
    <>
      <section>
        {Navbar}
        
        <div className="container_contact text-center">
          <h1 className="header_contact fw-bold">Contact</h1>
          <div className="line_br mt-3 mb-4"></div>
          <div className="row mt-3">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 grid_contact">
              <div className="row">
                <div>
                  <div className="parent_formTop_contact ">
                    <div class="input-group formTop_contact">
                      <label className="label_contact ">Name :</label>
                      <input
                        type="text"
                        class="form-control "
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="input-group formTop_contact">
                      <label className="label_contact form-label">
                        Email :
                      </label>
                      <input
                        type="text"
                        class="form-control "
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div className="parent_input_bottom">
                    <div class="input-group input_bottom ">
                      <label className="label_contact form-label">
                        Subject :
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Subject"
                        aria-label="Subject"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="input-group input_bottom">
                      <label className="label_contact form-label">
                        Message :
                      </label>
                      <textarea
                        class="form-control text-area"
                        id="exampleFormControlTextarea1"
                        placeholder="Message"
                        rows=""
                      ></textarea>
                    </div>
                  </div>

                  <button className="btn btn-dark btn_send_contact mt-5">
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>

        {Footer}
      </section>
    </>
  );
};

export default Contact;
