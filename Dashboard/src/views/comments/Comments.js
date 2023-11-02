import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CDataTable,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/Blogs.css";

const fields = ["No", "Name", "Text", "Date", "Title", "Description"];

const Comments = () => {
  const [dataComments, setDataComments] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);

  useEffect(async () => {
    localStorage.clear();
    localStorage.removeItem("editBlogs");

    await axios
      .get("http://localhost:3006/comments")
      .then((res) => {
        setDataComments(res.data.data);
      })
      .catch((err) => console.log(err));

    await axios
      .get("http://localhost:3006/blogs")
      .then((res) => {
        setDataBlog(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const convertTimeToJs = (date) => {
    let a = date + "";
    let b = a.slice(0, 10).replace("T", " ");
    return b;
  };

  const navigationForm = (item) => {
    if (item) {
      localStorage.setItem("editComments", JSON.stringify(item));
    }
    window.location = "/#/formInputComments";
  };

  const handleDelete = (itemID) => {
    axios
      .delete("http://localhost:3006/comments/" + itemID)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    const newDataComments = dataComments.filter((item, index) => {
      return item.comment_id !== itemID;
    });

    setDataComments(newDataComments);
  };

  const convertBlog = (item) => {
    let obj = {};

    dataBlog.map((item, index) => {
      obj[item.blog_id] = item.blog_title;
    });

    console.log("obj", item);

    return obj[item];
  };

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold headerCardTable">
          Comments List
        </CCardHeader>
        <CCardBody>
          <CButton
            onClick={() => navigationForm()}
            className="btn btn-outline-dark mb-2"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New
          </CButton>
          <CDataTable
            items={dataComments}
            fields={fields}
            itemsPerPage={6}
            pagination
            scopedSlots={{
              No: (item, index) => {
                let i = 1;
                return (
                  <td className="py-2">
                    <p>{i + index}</p>
                  </td>
                );
              },
              Name: (item, index) => {
                return (
                  <td className="py-2">
                    <p>{item.comment_name}</p>
                  </td>
                );
              },
              Text: (item, index) => {
                return (
                  <td className="py-2">
                    <p className="parag_length">{item.comment_text}</p>
                  </td>
                );
              },
              Date: (item, index) => {
                let arr = [];
                let push = [...arr, item.comment_date];
                return (
                  <td className="py-2">
                    {push.map((item) => {
                      let date = new Date(item).toLocaleDateString();
                      return convertTimeToJs(date);
                    })}
                  </td>
                );
              },
              Title: (item, index) => {
                console.log("cas", convertBlog(item.blog_id));
                return (
                  <td className="py-2">
                    <p>{convertBlog(item.blog_id)}</p>
                  </td>
                );
              },
              Description: (item, index) => {
                return (
                  <td className="py-2">
                    <p>
                      <CButton
                        onClick={() => handleDelete(item.comment_id)}
                        className="btn btn-danger"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className=" text-white"
                        />
                      </CButton>

                      <CButton
                        onClick={() => navigationForm(item)}
                        className="btn btn-success ml-2"
                      >
                        <FontAwesomeIcon
                          icon={faPencil}
                          className="text-white"
                        />
                      </CButton>
                    </p>
                  </td>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Comments;
