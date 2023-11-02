import React, { useState, useEffect } from "react";
import "../../assets/css/blog.css";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image from "../../assets/images/category.jpg";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Blog = ({Navbar, Footer}) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [selectCategory, setSelectCategory] = useState(0);
  const [dataCategories, setDataCategories] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);
  let indexFirstBlog = [];
  let date = new Date();

  useEffect(async () => {
    localStorage.removeItem("dataBlog");
    localStorage.clear();

    await axios
      .get("http://localhost:3006/categories")
      .then((res) => {
        setDataCategories(res.data.data);
      })
      .catch((err) => console.log(err));

    if (selectCategory) {
      await axios
        .get("http://localhost:3006/blogs/categories/" + selectCategory)
        .then((res) => {
          setDataBlog(res.data.data);

          let data = res.data.data;

          const endOffset = itemOffset + itemsPerPage;
          setCurrentItems(data.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(data.length / itemsPerPage));
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .get("http://localhost:3006/blogs")
        .then((res) => {
          setDataBlog(res.data.data);

          let data = res.data.data;

          const endOffset = itemOffset + itemsPerPage;
          setCurrentItems(data.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(data.length / itemsPerPage));
        })
        .catch((err) => console.log(err));
    }
  }, [itemsPerPage, itemOffset, selectCategory]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % dataBlog.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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
    <section>
      {Navbar}

      <div className="container_blog">
        <h1 className="header_blog fw-bold text-center">Blog</h1>
        <div className="line_br mt-3 mb-4"></div>
      </div>

      {dataCategories.length && (
        <div className="mt-5">
          <Carousel
            additionalTransfrom={0}
            arrows
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 3,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {(dataCategories || []).map((item, index) => {
              if (item.category_id === selectCategory) {
                return (
                  <div
                    key={index}
                    className="single-box-blog card_latest_blog color-category"
                  >
                    <a
                      href="#"
                      className="link-category"
                      onClick={() => setSelectCategory(item.category_id)}
                    >
                      <img className="image-blog-category" src={image} />
                    </a>
                    <h1 className="text-image-blog-category text-white">
                      {item.category_name}
                    </h1>
                  </div>
                );
              } else {
                return (
                  <div className="single-box-blog card_latest_blog">
                    <a
                      href="#"
                      className="link-category"
                      onClick={() => setSelectCategory(item.category_id)}
                    >
                      <img className="image-blog-category " src={image} />
                    </a>
                    <h1 className="text-image-blog-category text-white">
                      {item.category_name}
                    </h1>
                  </div>
                );
              }
            })}
          </Carousel>
        </div>
      )}

      <div className="container-body mt-4">
        {dataBlog.length && <p className="text-center fw-bold">List All</p>}

        {(dataBlog || []).map((item, index) => {
          let mappingDate = new Date(item.blog_date);

          if (
            getFullDate(mappingDate) === getFullDate(date) &&
            item.blog_status == "Publish"
          ) {
            let image = `http://localhost:3006/public/uploads/blogs/${item.blog_image}`;
            indexFirstBlog.push(index);

            if (indexFirstBlog[0] === index)
              return (
                <div key={index} className="row">
                  <div className="col-lg-12">
                    <div
                      className="img-header-body"
                      onClick={() => navigationPreview(item)}
                    >
                      <div
                        style={{
                          width: "90%",
                          height: "20rem",
                          backgroundImage: `url(${image})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          borderRadius: "10px",
                          backgroundPosition: "center",
                        }}
                        className="img-headline-body"
                      >
                        <div className="text-body-headline">
                          <h1>{item.blog_title}</h1>
                          <p className="text-most_popular">
                            {JSON.parse(item.blog_content).blocks[0].text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
          } else if (
            dataBlog.length - 1 === index &&
            item.blog_status == "Publish"
          ) {
            let image = `http://localhost:3006/public/uploads/blogs/${item.blog_image}`;

            indexFirstBlog.push(index);

            return (
              <div key={index} className="row">
                <div className="col-lg-12">
                  <div
                    className="img-header-body"
                    onClick={() => navigationPreview(item)}
                  >
                    <div
                      style={{
                        width: "90%",
                        height: "20rem",
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        borderRadius: "10px",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="text-body-headline">
                        <h1>{item.blog_title}</h1>
                        <p className="text-most_popular">
                          {JSON.parse(item.blog_content).blocks[0].text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}

        <div className="parents_cards_blog mt-5">
          {(currentItems || []).map((item, index) => {
            if (index !== indexFirstBlog[0] && item.blog_status == "Publish") {
              return (
                <div key={index} className="single-box-blog-list ">
                  <div className="card_latest">
                    <div>
                      <img
                        className="image-small-card"
                        src={`http://localhost:3006/public/uploads/blogs/${item.blog_image}`}
                      />
                      <h3 className="small-card-headline">{item.blog_title}</h3>
                      <div className="parents-text">
                        <p className="small-card-auth">{item.blog_author}</p>

                        <p className="small-card-date">
                          {showingDate(convertTimeToJs(item.blog_date))}
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

        <div className="paginate-blog pt-2">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={6}
            pageCount={pageCount}
            previousLabel="Previous"
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
      
      {Footer}
    </section>
  );
};

export default Blog;
