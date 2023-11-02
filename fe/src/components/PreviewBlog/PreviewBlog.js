import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
import "../../assets/css/previewBlog.css";
import axios from "axios";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const PreviewBlog = ({Navbar, Footer}) => {
  const [getBlogData, setGetBlogData] = useState(
    JSON.parse(localStorage.getItem("dataBlog"))
  );
  const [dataBlog, setDataBlog] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  const [commentText, setCommentText] = useState("");

  let countDataBlog = 0;
  let addView = getBlogData.viewer_id;


  let date = new Date();

  useEffect(async () => {
    await axios
      .get("http://localhost:3006/blogs")
      .then((res) => {
        setDataBlog(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:3006/comments")
      .then((res) => {
        setDataComment(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:3006/blogs/addView", {
        viewer_id: addView + 1,
        blog_id: getBlogData.blog_id,
      })
      .then((res) => {
        console.log(res);
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

  let convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const handleSendComment = () => {
    axios
      .post("http://localhost:3006/comments", {
        comment_name: "Unknown",
        comment_text: commentText,
        comment_date: date,
        blog_id: getBlogData.blog_id,
      })
      .then((res) => {
        console.log(res);
        setDataComment([...dataComment, res.data.body]);
        setCommentText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigationPreview = (item) => {
    localStorage.setItem("dataBlog", JSON.stringify(item));
    window.location = "/previewBlog";
  };

  return (
    <section>
      {Navbar}

      <div>
        <img
          className="img-preview"
          src={`http://localhost:3006/public/uploads/blogs/${getBlogData.blog_image}`}
        />
        <hr />
        <div className="text-small-preview">
          <small className="fw-bold">{getBlogData.blog_author}</small>
          <small className="fw-bold">
            {showingDate(convertTimeToJs(getBlogData.blog_date))}
          </small>
        </div>

        <div className="container-text-preview">
          <h1 className="fw-bold">{getBlogData.blog_title}</h1>
          <p className="mt-5">
            <Editor
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(getBlogData.blog_content))
              )}
              spellCheck={true}
              readOnly
            />
          </p>
        </div>

        <div className="comment-preview mt-5">
          <hr />

          {(dataComment || []).map((item, index) => {
            if (item.blog_id === getBlogData.blog_id)
              return (
                <>
                  <div className="comment-parents-preview">
                    <FontAwesomeIcon
                      className="icon-comment-preview fa-4x mt-3"
                      icon={faUserCircle}
                    />
                    <div className="mt-3">
                      <p className="comment-name-preview fw-bold">
                        {item.comment_name}
                      </p>
                      <p className="comment-text-preview">
                        {item.comment_text}
                      </p>
                    </div>
                  </div>
                  <hr />
                </>
              );
          })}

          <div>
            <div className="parents-comment-send">
              <FontAwesomeIcon
                className="icon-comment-preview fa-4x"
                icon={faUserCircle}
              />
              <div className="input-group input-comment-preview">
                <input
                  className=" form-control"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  class="btn btn-dark button-comment-preview"
                  type="button"
                  id="button-addon2"
                  onClick={() => handleSendComment()}
                >
                  <FontAwesomeIcon
                    className="icon-comment-preview fa-1x"
                    icon={faPaperPlane}
                  />
                </button>
              </div>
            </div>
          </div>

          <hr className="mt-5" />
        </div>

        <div className="mt-5 bottom-readMore">
          <h3 className="fw-bold text-center">Read More</h3>

          <div className="mt-5 card_blog">
            {(dataBlog || []).map((item, index) => {
              countDataBlog += 1;

              if (
                countDataBlog <= 3 &&
                getBlogData.blog_id !== item.blog_id &&
                item.blog_status == "Publish"
              ) {
                return (
                  <div className="list_card">
                    <div className="single-box">
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
                  </div>
                );
              }
            })}
          </div>

          <a
            href="/Blog"
            className="btn btn-outline-dark btn-more-preview mt-4"
          >
            More Details
          </a>
        </div>
      </div>

      {Footer}
    </section>
  );
};

export default PreviewBlog;
