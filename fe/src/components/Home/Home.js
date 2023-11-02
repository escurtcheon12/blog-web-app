import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const Home = ({Navbar, Footer}) => {
  const [dataBlog, setDataBlog] = useState([]);
  const [dataBlogViewer, setDataBlogViewer] = useState([]);
  const [dataComment, setDataComment] = useState([]);

  let indexFirstCategories = [];
  let number = 0;
  let totalPopular = 0;
  let totalComment = 0;
  let date = new Date();

  useEffect(async () => {
    localStorage.removeItem("dataBlog");
    localStorage.clear();

    await axios
      .get("http://localhost:3006/blogs/getBlogPublish")
      .then((res) => {
        setDataBlog(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:3006/blogs/getBlogViewer")
      .then((res) => {
        setDataBlogViewer(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:3006/comments/getBlogId")
      .then((res) => {
        setDataComment(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showingDate = (itemDate) => {
    let date = new Date(itemDate);
    let getDate = date.getDate();
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let getYear = date.getFullYear();

    return getDate + " " + monthNames[date.getMonth()] + " " + getYear;
  };

  let countComment = (key) => {
    let obj = {};

    (dataComment || []).map((item, index) => {
      obj[item.blog_id] = (obj[item.blog_id] || 0) + 1;
    });

    return obj[key];
  };

  const convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const getFullDate = (fullDate) => {
    let getMonth = fullDate.getMonth() + 1;
    if (getMonth < 10) {
      getMonth = "0" + getMonth;
    }

    return fullDate.getFullYear() + "-" + getMonth + "-" + fullDate.getDate();
  };

  const navigationPreview = (item) => {
    localStorage.setItem("dataBlog", JSON.stringify(item));
    window.location = "/previewBlog";
  };

  return (
    <>

    {Navbar}
      
      <div className="home">
        <div className="container_home">
          <h1 className="headline_top_home">Welcome to My Blog</h1>
          <p>
            I wanna share information with my persepective through this website
          </p>
        </div>

        <section id="ListBlog">
          <div className="top_header">
            <div>
              <h1 className="text-center mt-5 headline_listblog_home">
                List Blog
              </h1>
            </div>
            <div className="line_br"></div>
          </div>

          <div className="mt-5">
            <div className="row">
              {(dataBlog || []).map((item, index) => {
                let mappingDate = new Date(item.blog_date);

                if (getFullDate(mappingDate) === getFullDate(date)) {
                  let image = `http://localhost:3006/public/uploads/blogs/${item.blog_image}`;

                  indexFirstCategories.push(index);

                  if (indexFirstCategories[0] === index)
                    return (
                      <div
                        key={index}
                        className="col-lg-8 parent_image_most_popular"
                        onClick={() => navigationPreview(item)}
                      >
                        <div
                          style={{
                            width: "82%",
                            height: "21.5rem",
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            borderRadius: "1rem",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="desc_most_popular">
                            <h2 className="text-white">{item.blog_title}</h2>
                            <p className="text-white text-most_popular">
                              {JSON.parse(item.blog_content).blocks[0].text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                } else if (dataBlog.length - 1 === index) {
                  let image = `http://localhost:3006/public/uploads/blogs/${item.blog_image}`;
                  let total = 0;

                  indexFirstCategories.push(index);

                  return (
                    <div
                      key={index}
                      className="col-lg-8 parent_image_most_popular"
                      onClick={() => navigationPreview(item)}
                    >
                      <div
                        style={{
                          width: "82%",
                          height: "21.5rem",
                          backgroundImage: `url(${image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          borderRadius: "1rem",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="desc_most_popular">
                          <h2 className="text-white">{item.blog_title}</h2>
                          <p className="text-white text-most_popular">
                            {JSON.parse(item.blog_content).blocks[0].text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

              <div className="col-lg-4 parent_card_most_popular">
                <div className="card_most_popular">
                  <div className="top-bar-most-popular">
                    <p className="text-most-popular">Most Popular</p>
                  </div>

                  {(dataBlogViewer || []).map((item, index) => {
                    totalPopular += 1;

                    if (totalPopular <= 3)
                      return (
                        <div>
                          <div key={index} className="parent-main-most_popular">
                            <img
                              className="img-most-popular"
                              src={`http://localhost:3006/public/uploads/blogs/${item.blog_image}`}
                            />
                            <div className="parent-card-popular">
                              <p className="text-date-popular mt-2">
                                {showingDate(convertTimeToJs(item.blog_date))}
                              </p>
                              <p className="text-theme-popular">
                                {item.blog_title}
                              </p>
                              <p className="text-popular"></p>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="row">
              <div className="col-lg-7 offset-lg-1">
                <div className="parent-card-list">
                  {(dataBlog || []).map((item, index) => {
                    if (index !== indexFirstCategories[0]) {
                      number += 1;
                      if (number <= 4)
                        return (
                          <div key={index} className="single-box">
                            <div className="card_latest">
                              <div>
                                <img
                                  className="image-small-card"
                                  src={`http://localhost:3006/public/uploads/blogs/${item.blog_image}`}
                                />
                                <h3 className="small-card-headline">
                                  {item.blog_title}
                                </h3>
                                <div className="parents-text">
                                  <p className="small-card-auth">
                                    {item.blog_author}
                                  </p>
                                  <p className="small-card-date">
                                    {showingDate(
                                      convertTimeToJs(item.blog_date)
                                    )}
                                  </p>
                                </div>
                                <p className="small-card-desc">
                                  {JSON.parse(item.blog_content).blocks[0].text}
                                </p>

                                <div className="parent-card-link">
                                  <a
                                    onClick={() => navigationPreview(item)}
                                    className="btn btn-outline-dark small-card-link"
                                  >
                                    Read Details
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                    }
                  })}
                </div>
              </div>

              <div className="col-lg-4 parent_card_most_popular">
                <div className="card_most_popular">
                  <div className="top-bar-most-popular">
                    <p className="text-most-popular">Most Comment</p>
                  </div>

                  {(dataBlog || []).map((item, index) => {
                    totalComment += 1;

                    let image = `http://localhost:3006/public/uploads/blogs/${item.blog_image}`;

                    if (totalComment <= 3)
                      return (
                        <div key={index}>
                          <div className="parent-main-most_popular">
                            <div
                              style={{
                                height: "5rem",
                                width: "4rem",
                                borderRadius: "0.5rem",
                                backgroundImage: `url(${image})`,
                                marginTop: "0.2rem",
                                marginRight: "0.3rem",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div className="parent-card-popular">
                              <p className="text-date-popular">
                                {showingDate(convertTimeToJs(item.blog_date))}
                              </p>
                              <p className="text-theme-popular">
                                {item.blog_title}
                              </p>
                              <div className="text-popular">
                                <FontAwesomeIcon
                                  className="ml-4"
                                  icon={faMessage}
                                />
                                <small className="number-comment-popular">
                                  {countComment(item.blog_id)}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
                  
          <div className="place_button_more_details">
            <a href="/blog" class="btn_more_details btn btn-outline-dark">
              More Details
            </a>
          </div>
        </section>

        {Footer}
      </div>
                
    </>
  );
};

export default Home;
